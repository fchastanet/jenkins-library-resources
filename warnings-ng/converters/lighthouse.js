const SEVERITY_HIGH = "HIGH"
const SEVERITY_MEDIUM = "NORMAL"
const SEVERITY_LOW = "LOW"
// special severity, all issues with this severity 
// are filtered out before generating the final file
const SEVERITY_IGNORE = "IGNORE"

const SCORE_DISPLAY_MODE_BINARY = 'binary'
const SCORE_DISPLAY_MODE_NOT_APPLICABLE = 'notApplicable'
const SCORE_DISPLAY_MODE_NUMERIC = 'numeric'
const SCORE_DISPLAY_MODE_ERROR = 'error'

const defaulThresholdsConfig =  {
  categories: { 
    default: { thresholdWarning: 0.9, thresholdHigh: 0.8 },
  },
  audits: {}
}

const fs = require('fs');
const path = require('path');

// parse arguments
const argv = process.argv.slice(2)
if (argv.length < 2) {
  console.error('please provides exactly 2 arguments {fileToConvert} {thresholdsConfigFilepath}')
  process.exit(1)
}
let srcFile 
if (argv[0].startsWith('/')) {
  srcFile = argv[0]
} else {
  srcFile = path.join(process.cwd(), argv[0])
}
if (!fs.statSync(srcFile, fs.constants.R_OK)) {
  console.error(`file to convert '${srcFile}' is not readable`)
  process.exit(1)
}

// parse config
let thresholdsConfigFilepath
if (argv[1].startsWith('/')) {
  thresholdsConfigFilepath = argv[1]
} else {
  thresholdsConfigFilepath = path.join(process.cwd(), argv[1])
}
if (!fs.statSync(thresholdsConfigFilepath, fs.constants.R_OK)) {
  console.error(`config file '${thresholdsConfigFilepath}' is not readable`)
  process.exit(1)
}
const thresholdsConfig = {...defaulThresholdsConfig, ...require(thresholdsConfigFilepath)}

// parse src file
const data = fs.readFileSync(srcFile, { encoding:'utf8', flag:'r' })
const json = JSON.parse(data);

/**
 * for numeric score compute severity based on threshold
 * mark as HIGH if score <= thresholdHigh
 * mark as NORMAL if score <= thresholdWarning
 * else mark as IGNORED
 * @param {Object} issue
 * @param {Object} categoriesThreshold
 * @param {Object} defaultCategoriesThreshold
 */
function computeSeverityFromScore(issue, categoriesThreshold, defaultCategoriesThreshold) {
  const thresholdHigh = categoriesThreshold?.[issue.category]?.thresholdHigh
    || defaultCategoriesThreshold.thresholdHigh
  const thresholdWarning = categoriesThreshold?.[issue.category]?.thresholdWarning
    || defaultCategoriesThreshold.thresholdWarning

  const score = parseFloat(issue.score)
  if (score <= thresholdHigh) {
    issue.severity = SEVERITY_HIGH
  } else if (score <= thresholdWarning) {
    issue.severity = SEVERITY_MEDIUM
  } else {
    issue.severity = SEVERITY_IGNORE
  }
  console.error({ 
    issue: issue.category,
    score,
    thresholdHigh,
    thresholdWarning,
    computedSeverity: issue.severity
  })
  return issue
}

const additionalIssues = []
/**
 * additional issues like error in config file or conflicts between srcFile and configFile
 * @param {string} severity 
 * @param {string} file
 * @param {string} message
 * @param {Object} additionalData
 */
function addIssue(severity, file, message, additionalData = {}) {
  console.error(severity, file, message, additionalData)
  additionalIssues.push({
    fileName: path.basename(file),
    category: "error",
    directory: path.dirname(file),
    message,
    description: '',
    type: "error",
    severity,
  })
}

/**
 * check audit structure is right
 * @param {Object} audit
 */
function checkAuditProperties(audit) {
  if (!audit.hasOwnProperty('scoreDisplayMode')) {
    addIssue(
      SEVERITY_LOW, 
      srcFile, 
      `audit ${audit.category} without scoreDisplayMode property`, 
      audit
    )
    return false
  }
  if (!audit.hasOwnProperty('score')) {
    addIssue(
      SEVERITY_LOW, 
      srcFile, 
      `audit ${audit.category} without score property`, 
      audit
    )
    return false
  }
  if (!audit.hasOwnProperty('category')) {
    addIssue(
      SEVERITY_LOW, 
      srcFile, 
      `audit ${audit.category} without category property`, 
      audit
    )
    return false
  }
  return true
}

/**
 * check audit scoreDisplayMode property agains config
 * @param {Object} audit
 */
function checkAuditConfigScoreDisplayMode(auditConfig, audit) {
  switch(auditConfig.scoreDisplayMode) {
    case SCORE_DISPLAY_MODE_BINARY:
    case SCORE_DISPLAY_MODE_ERROR:
      if (!auditConfig.hasOwnProperty('severity')) {
        addIssue(
          SEVERITY_LOW, 
          thresholdsConfigFilepath, 
          `audit '${audit.category}' missing severity property`, 
          {audit, auditConfig}
        )
        return false
      }
      break
    case SCORE_DISPLAY_MODE_NOT_APPLICABLE:
      if (!auditConfig?.ignore) {
        addIssue(
          SEVERITY_LOW, 
          thresholdsConfigFilepath, 
          `not applicable audit '${audit.category}' should be set with ignore property set to true`, 
          {audit, auditConfig}
        )
        return false
      }
      break
    case SCORE_DISPLAY_MODE_NUMERIC:
      if (!auditConfig.hasOwnProperty('thresholdWarning')) {
        addIssue(
          SEVERITY_LOW, 
          thresholdsConfigFilepath, 
          `audit '${audit.category}' with displayMode numeric should be set with thresholdWarning property`, 
          {audit, auditConfig}
        )  
        return false 
      }
      if (!auditConfig.hasOwnProperty('thresholdHigh')) {
        addIssue(
          SEVERITY_LOW, 
          thresholdsConfigFilepath, 
          `audit '${audit.category}' with displayMode numeric should be set with thresholdHigh property`, 
          {audit, auditConfig}
        )
        return false
      }
      break
    default:
      if (!auditConfig?.ignore) {
        addIssue(
          SEVERITY_LOW, 
          thresholdsConfigFilepath, 
          `audit '${audit.category}', displayMode '${auditConfig.scoreDisplayMode}' not supported`, 
          {audit, auditConfig}
        )
      }
      return false
  }

  return true
}

/**
 * Compute audit severity based on config
 * audit can be 
 * - ignored
 * - compute severity based on scoreDisplayMode (numeric, binary, error)
 * raise issue 
 * - severity LOW if audit config not set
 * - severity LOW if audit scoreDisplayMode not compatible with config
 * @param {Object} audit
 */
function computeAuditSeverity(audit) {
  // check if audit has valid properties set
  if (!checkAuditProperties(audit)) {
    return audit
  }
  // check if audit exist in config
  if (!thresholdsConfig.audits.hasOwnProperty(audit.category)) {
    addIssue(
      SEVERITY_LOW, 
      thresholdsConfigFilepath, 
      `audit ${audit.category} configuration is not set, skip`
    )
    return audit
  }
  const auditConfig = thresholdsConfig.audits[audit.category]

  // check if ignored issue
  if (auditConfig?.ignore) {
    audit.severity = SEVERITY_IGNORE
    console.error(`ignore audit ${audit.category}`)
    return audit
  }

  // check if tested audit scoreDisplayMode is same as config's scoreDisplayMode or emit issue severity LOW
  if (auditConfig?.scoreDisplayMode !== audit.scoreDisplayMode) {
    addIssue(
      SEVERITY_LOW, 
      thresholdsConfigFilepath, 
      `audit '${audit.category}' scoreDisplayMode '${audit.scoreDisplayMode}' is incompatible with config scoreDisplayMode '${auditConfig?.scoreDisplayMode}'`, 
      {audit, auditConfig}
    )
    console.error(`audit ${audit.category} configuration error`)
    audit.severity = SEVERITY_LOW
    return audit
  }
  

  // check if auditConfig properties are valid with scoreDisplayMode or emit issue severity LOW
  if (!checkAuditConfigScoreDisplayMode(auditConfig, audit)) {
    console.error(`audit ${audit.category} scoreDisplayMode incompatibility, see previous logs`)
    return audit
  }

  // compute audit severity
  switch(auditConfig.scoreDisplayMode) {
    case SCORE_DISPLAY_MODE_NUMERIC:
      // from above checks default values are not needed but this function need some values
      return computeSeverityFromScore(audit, auditConfig, defaulThresholdsConfig.categories.default)
    case SCORE_DISPLAY_MODE_BINARY:
      if (audit.score) {
        audit.severity = SEVERITY_IGNORE
      } else {
        audit.severity = auditConfig.severity
      }
      console.error(`audit ${audit.category} severity set to ${audit.severity}`)
      return audit
    case SCORE_DISPLAY_MODE_ERROR:
      audit.severity = SEVERITY_HIGH
      console.error(`audit ${audit.category} severity set to ${audit.severity}`)
      return audit
  }

  // from above checks, this case should not occur
  console.error("unexpected display mode", auditConfig.scoreDisplayMode)
  audit.severity = SEVERITY_HIGH
  return audit
}

/**
 * convert url to a file base on config url2FileMapping
 * @param {Object} issue
 */
function convertUrlToFile(issue) {
  if (!thresholdsConfig.hasOwnProperty('url2FileMapping') || !issue.hasOwnProperty('fileName')) {
    return issue
  }
  for (const [urlPattern, fileName] of Object.entries(thresholdsConfig.url2FileMapping)) {
    urlRegex = new RegExp(urlPattern)
    if (urlRegex.test(issue.fileName)) {
      issue.fileName = fileName
    }
  }

  return issue
}

// calculate categories severity using thresholds
if (json.hasOwnProperty('issues')) {
  console.error(
    `${srcFile} - compute categories issues against thresholds : `, 
    thresholdsConfig.categories
  )
  json.issues.forEach((issue) => {
    if (issue.hasOwnProperty('type')) {
      issue = convertUrlToFile(issue)
      
      if (issue.type === 'category') {
        const categoriesThreshold = thresholdsConfig.categories
        const defaultCategoriesThreshold = thresholdsConfig.categories.default
    
        issue = computeSeverityFromScore(issue, categoriesThreshold, defaultCategoriesThreshold)
      } else if (issue.type === 'audit') {
        issue = computeAuditSeverity(issue)
      }

      // remove score and scoreDisplayMode properties to avoid false new warnings detection
      delete issue.score
      delete issue.scoreDisplayMode

      return issue
    }    
  })
}

// add additional issues if any
const originalIssuesCount=json.issues.length
json.issues = json.issues.concat(additionalIssues)
const totalIssuesCount=json.issues.length

// filter out issues marked as ignored
let lowIssuesCount = 0
let mediumIssuesCount = 0
let highIssuesCount = 0
let ignoredIssuesCount = 0
json.issues = json.issues.filter(issue => {
  switch(issue.severity) {
    case SEVERITY_LOW: lowIssuesCount++; break;
    case SEVERITY_MEDIUM: mediumIssuesCount++; break;
    case SEVERITY_HIGH: highIssuesCount++; break;
    case SEVERITY_IGNORE: ignoredIssuesCount++; break;
  }
  return issue.severity !== SEVERITY_IGNORE
});
const filteredIssuesCount=json.issues.length

// display stats
console.error("Stats", {
  originalIssuesCount,
  totalIssuesCount,
  lowIssuesCount,
  mediumIssuesCount,
  highIssuesCount,
  ignoredIssuesCount,
  filteredIssuesCount,
})

// rewrite json file
process.stdout.write(JSON.stringify(json, null, 2))

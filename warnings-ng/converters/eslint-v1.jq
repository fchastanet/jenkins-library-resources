# convert addons-linter format to be compatible with Warnings Next Generation Plugin
# DEPRECATED see README.md to see how to generate correct output 
# kept for compatibility with old versions
def convertSeverity(severity):
	if (severity.deprecated) then
		"LOW"
    elif (severity.type == "suggestion") then
        "LOW"
    elif (severity.type == "layout") then
        "NORMAL"
    elif (severity.type == "problem") then
        "HIGH"
    else
		"LOW"
	end
;

def convertRecommended(rule):
	if (rule.deprecated) then
		" Deprecated"
	else
      if (rule.docs.recommended) then
          " Recommended"
      else 
          ""
      end
	end
;

def transformIssue(root; parent; issues): issues  | select(length > 0) | { 
    "fileName": parent.filePath  | sub("/deploy/";"./"),  
    "category": "EsLint - \(root.metadata.rulesMeta[.ruleId].docs.category)",
    "lineStart": .line?, 
    "columnStart": .column?, 
    "message": .ruleId?, 
    "description": "\(.message?). Rule\(convertRecommended(root.metadata.rulesMeta[.ruleId])): \(root.metadata.rulesMeta[.ruleId].docs.description) \(root.metadata.rulesMeta[.ruleId].docs.url)", 
  	"severity": convertSeverity(root.metadata.rulesMeta[.ruleId])
};

def transformRule(ruleId; rule): rule | select(length > 0) | { 
    "fileName": "./.eslintrc.js",  
    "category": "EsLint - Deprecated rules",
    "message": ruleId, 
    "description": "\(ruleId) deprecated - \(rule.docs.description) - \(rule.docs.url)",
  	"severity": "NORMAL"
};

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
        (. as $root | .results[] | . as $parent | transformIssue($root; $parent; .messages[]?) | select(length > 0)),
  		(.metadata.rulesMeta  | to_entries[] | . as $rule | select(.value.deprecated == true) | transformRule($rule.key; $rule.value) | select(length > 0))
   		
    ]
}
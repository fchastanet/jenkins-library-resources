# convert npm audit v1 format to be compatible with Warnings Next Generation Plugin
def convertSeverity(severity):
    if (severity == "low") then
        "LOW"
    elif (severity == "normal") then
        "NORMAL"
    else    
        "HIGH"
    end
;

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
        .advisories[]? | { 
          "fileName": "./package.json",
          "category": "npmAudit",
          "directory": ("./node_modules/" + .module_name?),
          "moduleName": .module_name?,
          "message": "\(.findings[0]?.paths[0]?) : \(.title?) => \(.recommendation?)", 
          "description": "\(.overview?) : \(.cves), \(.findings[0]?.paths?) \( .references) ", 
          "severity": convertSeverity(.severity),
          "additionalProperties": {
            "cves": .cves,
            "path": .findings[0]?.paths?,
            "current_version": .findings[0]?.version,
            "vulnerable_versions": .vulnerable_versions,
            "patched_versions": .patched_versions,
            "recommendation": .recommendation,
            "references": .references,
            "cwe": .cwe,
            "url": .url
          } | @json
      }
    ]
}

# convert npm audit v2 format to be compatible with Warnings Next Generation Plugin

# "severity":"critical", => HIGH
# "severity":"high",     => HIGH
# "severity":"low",      => LOW
# "severity":"moderate", => NORMAL
def convertSeverity(severity):
    if (severity == "low") then
        "LOW"
    elif (severity == "moderate") then
        "NORMAL"
    else    
        "HIGH"
    end
;

def getEffectsList($root; effects):
	# webpack-dev-server  2.0.0-beta - 4.1.0 (node_modules/webpack-dev-server)
    #  which depends on vulnerable versions of ansi-html
    #  which depends on vulnerable versions of chokidar
    #  which depends on vulnerable versions of sockjs
    #  which depends on vulnerable versions of yargs
	# $root.vulnerabilities[] | select(.name | IN(effects)) | join(";")
	" has effects on " + (effects | join(",")) + " (check npm audit output to see dependencies tree)"
;

def convertFixAvailable($root; $parent):
	(
      if ($parent.fixAvailable|type == "boolean") then 
          (
            if ($parent.fixAvailable) then
              "Fix available via `npm audit fix --force`" 
            else
              "No fix available"
            end
          )
      elif ($parent.fixAvailable|type == "object") then 
          (
            (
              if ($parent.fixAvailable.isSemVerMajor) then
                (
                  "Fix available via `npm audit fix --force` Will install \($parent.fixAvailable.name)@\($parent.fixAvailable.version)"
                  + ", which is a breaking change for \n\($parent.effects | join(","))"
                )
              else
                "Fix available via `npm audit fix`"
              end
            )
          )
      else
          $parent | tostring 
      end
    ) + getEffectsList($root; $parent.effects)
;

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
        . as $root | .vulnerabilities[] | . as $parent | .via[] | { 
          "moduleName": $parent.name?,
          "fileName": "./package.json",
          "category": "npmAudit",
          "directory": ("./node_modules/" + $parent.name?),
          "message": "dependency \(.dependency) \(.range) : \(.title?) => \(.url?)", 
          "description": "\(convertFixAvailable($root; $parent))", 
          "severity": convertSeverity(.severity // "low"),
          "additionalProperties": {
            "range": .range?,
            "title": .title?,
            "url": .url?,
            "fixAvailable": .fixAvailable?,
            "nodes": $parent.nodes?,
            "effects": $parent.effects?,
            "overallSeverity": convertSeverity($parent.severity // "low"), 
            "overallRange": $parent.range?,
            "isDirect": $parent.isDirect?,
          } | @json
      }
    ]
}
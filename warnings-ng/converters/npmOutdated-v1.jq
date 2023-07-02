# convert npm outdated format to be compatible with Warnings Next Generation Plugin
{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
        .[] | { 
          "fileName": "./package.json",
          "category": "npmOutdated",
          "directory": ("./" + .location),
          "message": "Module '\(.location)' is deprecated",
          "description": "current version: \(.current), latest : \(.latest), minimum version wanted: \(.wanted)",
          "severity": "LOW"
      }
    ]
}

def transformCategories(parent; categories): categories  | select(length > 0) | { 
  "fileName": parent.requestedUrl,
  "category": .id,
  "directory": "dist",
  "message": (if .description then ("\(.title) - \(.description)") else ("\(.title)") end),
  "type": "category",
  "description": (.manualDescription // ""), 
  "severity": "LOW",
  "score": .score | tostring,
  "scoreDisplayMode": "numeric"
};

def transformAudits(parent; audits): audits 
  | select(
    (.scoreDisplayMode != "notApplicable" and .scoreDisplayMode != "informative" and .scoreDisplayMode != "manual")
    and (
      (.scoreDisplayMode == "binary" and .score == 0)
      or (.scoreDisplayMode == "numeric")
      or (.scoreDisplayMode == "error")
    )
  )
  | { 
    "fileName": parent.requestedUrl,
    "category": .id,
    "directory": "dist",
    "message": (if .description then ("\(.title) - \(.description)") else .title end),
    "type": "audit",
    "severity": "LOW",
    "score": .score | tostring ,
    "scoreDisplayMode": .scoreDisplayMode? | tostring,
  }
;

def transformRunWarnings(parent; runWarnings): runWarnings  | select(length > 0) | { 
  "fileName": parent.requestedUrl,
  "category": "runWarnings",
  "type": "warning",
  "directory": "dist",
  "message": ., 
  "score": "null",
  "scoreDisplayMode": "numeric",
  "severity": "HIGH",
};

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
  		. as $parent | 
  			transformAudits($parent; .audits[]?),
  			transformRunWarnings($parent; .runWarnings[]?),
  			transformCategories($parent; .categories[]?)	
  		| select(length > 0)
  	]
}

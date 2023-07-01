# convert addons-linter format to be compatible with Warnings Next Generation Plugin
# script parameters
# $BASE_DIR

# transformIssue
def transformIssue(issues; severity): issues  | select(length > 0) | {
    "fileName": ($BASE_DIR + .file), 
    "category": "addons",
    "lineStart": .line?, 
    "columnStart": .column?, 
    "message": .message, 
    "description": .description,
    "severity": severity
};

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [ 
                transformIssue(.notices[]?; "LOW"),
                transformIssue(.warnings[]?; "NORMAL"),
                transformIssue(.errors[]?; "ERROR")
            | select(length > 0)
    ]
}
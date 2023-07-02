# convert addons-linter format to be compatible with Warnings Next Generation Plugin
# DEPRECATED see README.md to see how to generate correct output 
# kept for compatibility with old versions
def transformIssue(parent; issues; severity): issues  | select(length > 0) | { 
    "fileName": parent.source | sub("/deploy/";"./"),  
    "category": "StyleLint",
    "lineStart": .line?, 
    "columnStart": .column?, 
    "message": .rule?, 
    "description": .text?, 
    "severity": severity
};

{
    "_class": "io.jenkins.plugins.analysis.core.restapi.ReportApi",
    "issues": [
        .[] | . as $parent | 
                transformIssue($parent; .warnings[]?; "NORMAL"),
                transformIssue($parent; .invalidOptionWarnings[]?; "NORMAL"),
                transformIssue($parent; .deprecations[]?; "LOW"),
                transformIssue($parent; .parseErrors[]?; "ERROR")
            | select(length > 0)
    ]
}

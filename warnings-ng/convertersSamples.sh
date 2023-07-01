#!/bin/sh
set -x
set -o errexit
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

(
    cd converters
    # by default we are converters directory
    mkdir -p ../lintLogsSamples/converted || true
    # ng formats
    jq --arg BASE_DIR "./dist/" \
        -f "./addons-v1.jq" \
        "../lintLogsSamples/addons-v1.json" \
        > "../lintLogsSamples/converted/addons-v1.json"
    
    jq \
        -f "./eslint-v1.jq" \
        "../lintLogsSamples/eslint-v1.json" \
        > "../lintLogsSamples/converted/eslint-v1.json"

    jq \
        -f "./npmAudit-v1.jq" \
        "../lintLogsSamples/npmBigAudit-v1.json" \
        > "../lintLogsSamples/converted/npmBigAudit-v1.json"

    jq \
        -f "./npmAudit-v2.jq" \
        "../lintLogsSamples/npmBigAudit-v2.json" \
        > "../lintLogsSamples/converted/npmBigAudit-v2.json"

    jq \
        -f "./npmOutdated-v1.jq" \
        "../lintLogsSamples/npmOutdated-v1.json" \
        > "../lintLogsSamples/converted/npmOutdated-v1.json"

    jq --arg BASE_DIR "./dist/" \
        -f "./stylelint-v1.jq" \
        "../lintLogsSamples/stylelint-v1.json" \
        > "../lintLogsSamples/converted/stylelint-v1.json"

    jq \
        -f "./lighthouse-v0.8.jq" \
        "../lintLogsSamples/lighthouse-v0.8.json" \
        > "../lintLogsSamples/converted/lighthouse-v0.8.json"

    node ./lighthouse.js \
        "../lintLogsSamples/converted/lighthouse-v0.8.json" \
        "../lintLogsSamples/conf/lighthouse-v0.8-thresholds-default.js" \
        > ../lintLogsSamples/converted/lighthouse-v0.8-thresholds-default.json
    
    node ./lighthouse.js \
        "../lintLogsSamples/converted/lighthouse-v0.8.json" \
        "../lintLogsSamples/conf/lighthouse-v0.8-thresholds-ignore.js" \
        > ../lintLogsSamples/converted/lighthouse-v0.8-thresholds-ignore.json
    
    node ./lighthouse.js \
        "../lintLogsSamples/converted/lighthouse-v0.8.json" \
        "../lintLogsSamples/conf/lighthouse-v0.8-thresholds-overriden.js" \
        > ../lintLogsSamples/converted/lighthouse-v0.8-thresholds-overriden.json
)
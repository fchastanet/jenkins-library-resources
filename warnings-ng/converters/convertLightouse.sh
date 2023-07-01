#!/bin/sh
set -x
set -o errexit

jqFile="${1:-lighthouse-v0.8}"
categoriesThreshold="$2"

jq -f "/usr/app/converters/${jqFile}.jq" \
  /tmp/srcReportFile > /tmp/tempReport

node '/usr/app/converters/lighthouse.js' \
  /tmp/tempReport "${categoriesThreshold}"
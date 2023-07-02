#!/bin/sh
set -x
set -o errexit
BASE_DIR="$(cd "$(dirname "$0")" && pwd)"

(
	cd "${BASE_DIR}/converters" || exit 1
	# by default we are converters directory
	mkdir -p "${BASE_DIR}/lintLogsSamples/converted" || true
	# ng formats
	jq --arg BASE_DIR "./dist/" \
		-f "./addons-v1.jq" \
		"${BASE_DIR}/lintLogsSamples/addons-v1.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/addons-v1.json"

	jq \
		-f "./eslint-v1.jq" \
		"${BASE_DIR}/lintLogsSamples/eslint-v1.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/eslint-v1.json"

	jq \
		-f "./npmAudit-v1.jq" \
		"${BASE_DIR}/lintLogsSamples/npmBigAudit-v1.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/npmBigAudit-v1.json"

	jq \
		-f "./npmAudit-v2.jq" \
		"${BASE_DIR}/lintLogsSamples/npmBigAudit-v2.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/npmBigAudit-v2.json"

	jq \
		-f "./npmOutdated-v1.jq" \
		"${BASE_DIR}/lintLogsSamples/npmOutdated-v1.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/npmOutdated-v1.json"

	jq --arg BASE_DIR "./dist/" \
		-f "./stylelint-v1.jq" \
		"${BASE_DIR}/lintLogsSamples/stylelint-v1.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/stylelint-v1.json"

	jq \
		-f "./lighthouse-v0.8.jq" \
		"${BASE_DIR}/lintLogsSamples/lighthouse-v0.8.json" \
		>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8.json"

	node ./lighthouse.js \
		"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8.json" \
		"${BASE_DIR}/lintLogsSamples/conf/lighthouse-v0.8-thresholds-default.js" \
		>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-default.json"
	echo >>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-default.json"

	node ./lighthouse.js \
		"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8.json" \
		"${BASE_DIR}/lintLogsSamples/conf/lighthouse-v0.8-thresholds-ignore.js" \
		>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-ignore.json"
	echo >>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-ignore.json"

	node ./lighthouse.js \
		"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8.json" \
		"${BASE_DIR}/lintLogsSamples/conf/lighthouse-v0.8-thresholds-overriden.js" \
		>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-overriden.json"
	echo >>"${BASE_DIR}/lintLogsSamples/converted/lighthouse-v0.8-thresholds-overriden.json"
)

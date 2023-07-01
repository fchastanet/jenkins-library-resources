# jenkins_library_resources

- [1. Introduction](#1-introduction)
- [2. Build](#2-build)
- [3. Convert a file](#3-convert-a-file)
- [4. Regenerate all the samples](#4-regenerate-all-the-samples)

## 1. Introduction

Resources used by [jenkins_library](https://github.com/fchastanet/jenkins_library)

Several converters for Jenkins warnings NG have been implemented:

- stylelint-v1
- npmOutdated-v1
- npmAudit-v1
- npmAudit-v1
- lighthouse-v0.8
- eslint-v1
- addons-v1

All these converters are using [https://stedolan.github.io/jq/manual/](jq). A jq program is a "filter": it takes an input, and produces an output. There are a lot of builtin filters for extracting a particular field of an object, or converting a number to a string, or various other standard tasks. 

Here we are converting npm, stylelint, eslint, lighthouse json output to [https://github.com/jenkinsci/warnings-ng-plugin](Jenkins Warnings NG) plugin 
[https://github.com/jenkinsci/warnings-ng-plugin/blob/master/plugin/src/test/resources/io/jenkins/plugins/analysis/warnings/steps/issues.json](issues in ng format)

You can find some [warnings-ng/lintLogsSamples](conversion examples)

Lighthouse plugin uses 2 conversions:

- jq conversion
- nodejs in order to set severity upon calculated thresholds

Eg:

```json
{ 
  "default": { "thresholdWarning": 0.60, "thresholdHigh": 0.50 },
  "performance": { "thresholdWarning": 0.93, "thresholdHigh": 0.8 }
}
```

if performance is lower or equal to 0.93 but above 0.8, performance severity will be set to WARNING
if performance is lower or equal to 0.8, performance severity will be set to HIGH
else performance severity will be set to LOW
For all other categories, we will get the default

## 2. Build

Build and connect to the container:

```bash
docker build -t lint-converters warnings-ng/
docker run --rm -it \
  -v "$(pwd)/warnings-ng":/usr/app \
  lint-converters sh
```

## 3. Convert a file

Run a converter:

```bash
docker run --rm \
  -v "$(pwd)/warnings-ng":/usr/app \
  lint-converters node "/usr/app/converters/lighthouse.js" \
  /usr/app/lintLogsSamples/converted/lighthouse-v0.8.json \
  '{"default":{"thresholdWarning":0.9,"thresholdHigh":0.8}}'
```

## 4. Regenerate all the samples

```bash
./warnings-ng/convertersSamples.sh
```

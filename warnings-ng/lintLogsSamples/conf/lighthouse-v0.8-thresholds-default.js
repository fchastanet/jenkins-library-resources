// if true, means files are served locally to lighthouse, ignore all rules based on HTTP/HTTPS
const localMode = true
const auditDefaulThresholdWarning = 0.9
const auditDefaulThresholdHigh = 0.8

const SEVERITY_HIGH = "HIGH"
const SEVERITY_MEDIUM = "NORMAL"
const SEVERITY_LOW = "LOW"

/**
 * Thresholds Configuration 
 * 
 * jq to generate default audit list
 * ```jq
[.audits[] | select(
  (.scoreDisplayMode != "informative" and .scoreDisplayMode != "manual")
  and (
    (.scoreDisplayMode == "binary")
    or (.scoreDisplayMode == "notApplicable")
    or (.scoreDisplayMode == "numeric")
    or (.scoreDisplayMode == "error")
  )
)] | map( { (.id): {ignore: true, scoreDisplayMode} } ) | add 
 * ```
 */
module.exports = {
  url2FileMapping: {
    "http://localhost:[0-9]+/index.html": "./src/views/ContentView.vue",
    "http://localhost:[0-9]+/index.html#/1": "./src/components/ContentFile.vue",
    "http://localhost:[0-9]+/index.html#/2": "./src/components/ContentScorm.vue",
    "http://localhost:[0-9]+/index.html#/3": "./src/components/ContentVideo.vue",
  },

  /*
  * if thresholdWarning is .7 and one of audit score is less or equal .7 but above thresholdHigh
  * then issue will be at warning severity
  * if empty value then we use this default value: ```[thresholdWarning: .7, thresholdHigh: .5]```
  */
  categories: { 
    default: { thresholdWarning: auditDefaulThresholdWarning, thresholdHigh: auditDefaulThresholdHigh },
  },

  /**
   * Define for each audit type the threshold to apply
   * threshold config depends on scoreDisplayMode
   * scoreDisplayMode == 'binary' => needs severity property
   *  if score is 0, we set the severity, else we ignore the issue
   * scoreDisplayMode == 'numeric' => needs thresholdWarning and thresholdHigh properties
   *   if thresholdWarning is .7 and one of audit score is less or equal .7 but above thresholdHigh
   *    then issue will be at warning severity
   */
  audits: {
    "is-on-https": {
      ignore: localMode,
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "redirects-http": {
      ignore: localMode,
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "service-worker": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_LOW,
    },
    "viewport": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "first-contentful-paint": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "largest-contentful-paint": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "first-meaningful-paint": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "speed-index": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "total-blocking-time": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "max-potential-fid": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "cumulative-layout-shift": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "errors-in-console": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "server-response-time": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "interactive": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "redirects": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "installable-manifest": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "apple-touch-icon": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "splash-screen": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "themed-omnibox": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "maskable-icon": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "content-width": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "image-aspect-ratio": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "image-size-responsive": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "deprecations": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "mainthread-work-breakdown": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "bootup-time": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "uses-rel-preload": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "uses-rel-preconnect": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "font-display": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "third-party-summary": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "no-unload-listeners": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "valid-source-maps": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "preload-lcp-image": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "aria-allowed-attr": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-hidden-body": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-hidden-focus": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-required-attr": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-roles": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-valid-attr-value": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "aria-valid-attr": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "button-name": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "color-contrast": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "document-title": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "duplicate-id-active": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "duplicate-id-aria": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "html-has-lang": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "html-lang-valid": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "meta-viewport": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "tabindex": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "valid-lang": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "video-caption": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "uses-long-cache-ttl": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "total-byte-weight": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "offscreen-images": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "render-blocking-resources": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "unminified-css": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "unminified-javascript": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "unused-css-rules": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "unused-javascript": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "modern-image-formats": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "uses-optimized-images": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "uses-text-compression": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "uses-responsive-images": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "efficient-animated-content": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "duplicated-javascript": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "legacy-javascript": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "appcache-manifest": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "doctype": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "charset": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "dom-size": {
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "external-anchors-use-rel-noopener": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "geolocation-on-start": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "inspector-issues": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "no-document-write": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "no-vulnerable-libraries":   {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "js-libraries": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "notification-on-start": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "password-inputs-can-be-pasted-into": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "uses-http2": {
      ignore: localMode,
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "uses-passive-event-listeners": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "meta-description": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_LOW,
    },
    "http-status-code": {
      ignore: localMode,
      scoreDisplayMode: "binary",
      severity: SEVERITY_LOW,
    },
    "font-size": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "link-text": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_LOW,
    },
    "crawlable-anchors": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_HIGH,
    },
    "is-crawlable": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_LOW,
    },
    "tap-targets": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "hreflang": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },
    "plugins": {
      scoreDisplayMode: "binary",
      severity: SEVERITY_MEDIUM,
    },

    // following rules are marked as not applicable (but some could be applicable
    "user-timings": {
      // could be interesting to use
      ignore: true,
      scoreDisplayMode: "notApplicable",
    },
    "critical-request-chains": {
      ignore: localMode,
      scoreDisplayMode: "numeric",
      thresholdWarning: auditDefaulThresholdWarning, 
      thresholdHigh: auditDefaulThresholdHigh,
    },
    "preload-fonts": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "performance-budget": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "timing-budget": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "third-party-facades": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "layout-shift-elements": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "non-composited-animations": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "unsized-images": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "accesskeys": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-command-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-input-field-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-meter-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-progressbar-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-required-children": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-required-parent": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-toggle-field-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-tooltip-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "aria-treeitem-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "bypass": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "definition-list": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "dlitem": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "form-field-multiple-labels": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "frame-title": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "heading-order": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "image-alt": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "input-image-alt": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "label": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "link-name": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "list": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "listitem": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "meta-refresh": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "object-alt": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "td-headers-attr": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "th-has-data-cells": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "robots-txt": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    },
    "canonical": {
      ignore: true,
      scoreDisplayMode: "notApplicable"
    }
  }
}

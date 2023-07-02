// if true, means files are served locally to lighthouse, ignore all rules based on HTTP/HTTPS
const localMode = true
const auditDefaulThresholdWarning = 0.9
const auditDefaulThresholdHigh = 0.8

const SEVERITY_HIGH = "HIGH"
const SEVERITY_MEDIUM = "NORMAL"
const SEVERITY_LOW = "LOW"

module.exports = {
  categories: {
    default: {
      thresholdWarning: auditDefaulThresholdWarning, thresholdHigh: auditDefaulThresholdHigh },
  },
  audits: {
    "is-on-https": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "redirects-http": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "service-worker": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "viewport": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "first-contentful-paint": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "largest-contentful-paint": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "first-meaningful-paint": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "speed-index": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "total-blocking-time": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "max-potential-fid": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "cumulative-layout-shift": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "errors-in-console": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "server-response-time": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "interactive": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "redirects": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "installable-manifest": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "apple-touch-icon": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "splash-screen": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "themed-omnibox": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "maskable-icon": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "content-width": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "image-aspect-ratio": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "image-size-responsive": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "deprecations": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "mainthread-work-breakdown": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "bootup-time": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "uses-rel-preload": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "uses-rel-preconnect": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "font-display": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "third-party-summary": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "no-unload-listeners": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "valid-source-maps": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "preload-lcp-image": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "aria-allowed-attr": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-hidden-body": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-hidden-focus": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-required-attr": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-roles": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-valid-attr-value": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "aria-valid-attr": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "button-name": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "color-contrast": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "document-title": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "duplicate-id-active": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "duplicate-id-aria": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "html-has-lang": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "html-lang-valid": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "meta-viewport": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "tabindex": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "valid-lang": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "video-caption": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "uses-long-cache-ttl": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "total-byte-weight": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "offscreen-images": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "render-blocking-resources": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "unminified-css": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "unminified-javascript": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "unused-css-rules": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "unused-javascript": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "modern-image-formats": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "uses-optimized-images": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "uses-text-compression": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "uses-responsive-images": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "efficient-animated-content": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "duplicated-javascript": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "legacy-javascript": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "appcache-manifest": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "doctype": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "charset": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "dom-size": {
      ignore: true,
      scoreDisplayMode: "numeric",
    },
    "external-anchors-use-rel-noopener": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "geolocation-on-start": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "inspector-issues": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "no-document-write": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "no-vulnerable-libraries":   {
      scoreDisplayMode: "binary",
    },
    "js-libraries": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "notification-on-start": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "password-inputs-can-be-pasted-into": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "uses-http2": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "uses-passive-event-listeners": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "meta-description": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "http-status-code": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "font-size": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "link-text": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "crawlable-anchors": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "is-crawlable": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "tap-targets": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "hreflang": {
      ignore: true,
      scoreDisplayMode: "binary",
    },
    "plugins": {
      ignore: true,
      scoreDisplayMode: "binary",
    },

    // following rules are marked as not applicable (but some could be applicable
    "user-timings": {
      ignore: true,
      // could be interesting to use
      ignore: true,
      scoreDisplayMode: "notApplicable",
    },
    "critical-request-chains": {
      ignore: true,
      scoreDisplayMode: "numeric",
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

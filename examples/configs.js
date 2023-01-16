const USERAGENT_DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse';
const DESKTOP_EMULATION_METRICS = {
  mobile: false,
  width: 1350,
  height: 940,
  deviceScaleFactor: 1,
  disabled: false,
};

const DESKTOP_SETUP = {
  url: 'https://www.arodriguezv.me/',
  fileName: `dynamic_filename_report_${new Date().toISOString()}`,
  execute: 10, // not implemented yet
  configs: {
    extends: 'lighthouse:default',
    settings: {
      formFactor: 'desktop',
      throttling: {
        rttMs: 40,
        throughputKbps: 10 * 1024,
        cpuSlowdownMultiplier: 1,
        requestLatencyMs: 0, // 0 means unset
        downloadThroughputKbps: 0,
        uploadThroughputKbps: 0,
      },
      screenEmulation: DESKTOP_EMULATION_METRICS,
      emulatedUserAgent: USERAGENT_DESKTOP,
      skipAudits: ['uses-http2'],
    },
  },
  flags: {
    output: ['json', 'html', 'csv'],
  },
};

const MOBILE_SETUP = {
  url: 'https://www.arodriguezv.me',
  fileName: 'static_filename_report',
  configs: {
    extends: 'lighthouse:default',
    settings: {
      maxWaitForFcp: 15 * 1000,
      maxWaitForLoad: 35 * 1000,
      skipAudits: ['uses-http2'],
    },
  },
  flags: {
    onlyCategories: ['performance'],
    output: 'html',
  },
};

const webPagesList = [
  DESKTOP_SETUP,
  MOBILE_SETUP
];

const defaultConfigs = {
  webPagesList,
  outputPath: 'reports',
  lhrDefaultConfigs: {},
  lhrDefaultFlags: {
    logLevel: 'info',
  },
  chromeDefaultFlags: ['--headless'],
};

export default defaultConfigs;

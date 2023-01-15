const USERAGENT_DESKTOP = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4695.0 Safari/537.36 Chrome-Lighthouse';
const DESKTOP_EMULATION_METRICS = {
  mobile: false,
  width: 1350,
  height: 940,
  deviceScaleFactor: 1,
  disabled: false,
};

const webPagesList = [
  {
    url: 'https://www.example.com/',
    name: `my_page_${new Date().toISOString()}`,
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
      // maxWaitForFcp: 15 * 1000,
      // maxWaitForLoad: 35 * 1000,
    },
    flags: {
      output: ['json', 'html', 'csv'],
    },
  },
  // {
  //   url: 'https://www.example.com/',
  //   name: 'test_Page_2',
  //   configs: {
  //     maxWaitForFcp: 15 * 1000,
  //     maxWaitForLoad: 35 * 1000,
  //     formFactor: 'desktop',
  //   },
  //   flags: {
  //     onlyCategories: ['performance'],
  //     screenEmulation: { disabled: true },
  //     output: ['html'],
  //   },
  // },
  // {
  //   url: 'https://www.example.com/',
  //   name: 'test_page_3',
  //   configs: {},
  //   flags: {
  //     output: ['html', 'csv'],
  //   },
  // },
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

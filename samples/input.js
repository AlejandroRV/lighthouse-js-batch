const pages = [
  {
    url: 'https://www.example.com/',
    name: `my_page_${new Date().toISOString()}`,
    execute: 10,
    configs: {
      output: ['json', 'html', 'csv'],
    },
  },
  {
    url: 'https://www.example.com/',
    name: 'test_Page_1',
    configs: {
      onlyCategories: ['performance'],
      screenEmulation: { disabled: true },
      output: ['html'],
    },
  },
  {
    url: 'https://www.example.com/',
    name: 'test_page_3',
    configs: {
      output: ['html', 'csv'],
    },
  },
];

const defaultConfigs = {
  pagesList: pages,
  outputPath: 'reports',
  lhrDefaultConfigs: {
    logLevel: 'info',
  },
  chromeDefaultFlags: ['--headless'],
};

module.exports = defaultConfigs;

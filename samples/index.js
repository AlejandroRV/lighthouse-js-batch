const {
  pagesList,
  outputPath,
  lhrDefaultConfigs,
  chromeDefaultFlags,
} = require('./input');

const lhrRunnerReport = require('../src');

(async () => {
  const result = await lhrRunnerReport({
    pagesList, lhrDefaultConfigs, chromeDefaultFlags, outputPath,
  });

  console.log('Result page 1: ', result[0].lhr.categories.performance.score * 100);
  console.log('Result page 2: ', result[1].lhr.categories.performance.score * 100);
  console.log('Result page 3: ', result[2].lhr.categories.performance.score * 100);
})();

import { getReports } from '../lib/esm/index.js';
import configs from './configs.js';

const {
  webPagesList,
  outputPath,
  lhrDefaultConfigs,
  lhrDefaultFlags,
  chromeDefaultFlags,
} = await configs;

const lhResults = await getReports({
  webPagesList, lhrDefaultFlags, lhrDefaultConfigs, chromeDefaultFlags, outputPath,
});

console.log('Result page 1: ', lhResults[0].lhr.categories.performance.score * 100);

import { runAudits } from '../lib/esm/index.js';
import configs from './configs.js';

// configs for mobile and desktop with different output formats
runAudits(configs).then((results) => {
  // use the array results to do whatever you want
  console.log('Performance Score url 1: ', results[0].lhr.categories.performance.score * 100);
});

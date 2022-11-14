const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

async function writeReports(reports, outputPath) {
  const promises = [];

  reports.forEach((report) => {
    if (report?.output) {
      if (typeof report.output === 'string') {
        // eslint-disable-next-line no-param-reassign
        report.output = [report.output];
      }

      report.output.forEach((outputType, index) => {
        try {
          // creates a new folder if it's not there
          if (!fs.existsSync(outputPath)) {
            fs.mkdirSync(outputPath, { recursive: true });
          }

          promises.push(fs.promises.writeFile(
            `${outputPath}/${report?.name}.${outputType}`,
            `${Array.isArray(report?.reports) ? report?.reports[index] : report?.reports}`,
          ));
        } catch (error) {
          throw new Error('error writing file:', error);
        }
      });
    }
  });

  return Promise.all(promises);
}

async function lighthouseRunner(webDetails, lhrConfigs = {}, chromeFlags = []) {
  const chrome = await chromeLauncher.launch({ chromeFlags });
  const runnerResult = await lighthouse(webDetails.url, { ...lhrConfigs, port: chrome.port });

  await chrome.kill();

  return runnerResult;
}

async function getReports({
  pagesList, lhrDefaultConfigs = {}, chromeDefaultFlags = [], outputPath,
}) {
  const chromeFlags = [...chromeDefaultFlags];
  let reportsRequired = false;
  const results = [];

  for (let i = 0; i < pagesList.length; i++) {
    // join default configs and individual configs
    const lhrConfigs = { ...lhrDefaultConfigs, ...pagesList[i].configs };

    // Await inside the for loop on purpose to wait for each report execution
    // otherwise the report/chrome-launcher would run asynchronously which could impact the analysis
    // Enabling an async execution would imply to know exactly many factors i.e. cores, network etc.
    const analysis = await lighthouseRunner(pagesList[i], lhrConfigs, chromeFlags);

    if (!reportsRequired && lhrConfigs?.output) {
      reportsRequired = Boolean(lhrConfigs?.output);
    }

    if (reportsRequired && analysis?.report && !Array.isArray(analysis.report)) {
      analysis.report = [analysis.report];
    }

    results.push({
      name: pagesList[i]?.name,
      reports: analysis?.report,
      lhr: analysis.lhr,
      output: lhrConfigs?.output,
    });
  }

  if (reportsRequired) await writeReports(results, outputPath);

  return results;
}

module.exports = getReports;

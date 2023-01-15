import fs from 'fs';
import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';

async function writeReports(report:Result, outputPath:string) {
  const promises:Promise<void>[] = [];

  if (report?.output) {
    if (typeof report.output === 'string') {
      // eslint-disable-next-line no-param-reassign
      report.output = [report.output];
    }

    report.output.forEach((outputType:string, index:number) => {
      // creates a new folder if it's not there
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      promises.push(fs.promises.writeFile(
        `${outputPath}/${report?.name}.${outputType}`,
        `${Array.isArray(report?.reports) ? report?.reports[index] : report?.reports}`,
      ));
    });
  }

  return Promise.all(promises);
}

async function lighthouseRunner(url:string, lhFlags:Partial<LH.CliFlags> = {}, lhConfigs:Partial<LH.Config.Json> = { extends: 'lighthouse:default' }, chromeFlags:string[] = []) {
  const chrome = await { launch }.launch({ chromeFlags });
  // https://github.com/GoogleChrome/lighthouse/blob/888bd6dc9d927a734a8e20ea8a0248baa5b425ed/typings/externs.d.ts#L122
  const runnerResult = await lighthouse(url, { ...lhFlags, port: chrome.port }, lhConfigs);

  await chrome.kill();

  return runnerResult;
}

export async function getReports({
  webPagesList, lhrDefaultFlags = {}, lhDefaultConfigs = {}, chromeDefaultFlags = [], outputPath = 'reports',
}: GetReportsParams): Promise<Result[]> {
  const chromeFlags = [...chromeDefaultFlags];
  const listOfResults:Result[] = [];

  for (let i = 0; i < webPagesList.length; i++) {
    // join default configs and individual configs
    const lhFlags = { ...lhrDefaultFlags, ...webPagesList[i]?.flags };
    const lhConfigs = { extends: 'lighthouse:default', ...lhDefaultConfigs, ...webPagesList[i]?.configs };
    // Await inside the for loop on purpose to wait for each report execution
    // otherwise the report/chrome-launcher would run asynchronously which could impact the analysis
    // Enabling an async execution would imply to know exactly many factors i.e. cores, network etc.
    const analysis = await lighthouseRunner(webPagesList[i].url, lhFlags, lhConfigs, chromeFlags);

    if (analysis?.report && !Array.isArray(analysis.report)) {
      analysis.report = [analysis.report];
    }
 
    const result:Result = {
      name: webPagesList[i]?.name,
      reports: analysis?.report,
      lhr: analysis.lhr,
      output: lhFlags?.output,
    };

    listOfResults.push(result);

    if (lhFlags?.output && lhFlags?.output?.length > 0) {
      await writeReports(result, outputPath);
    }
  }

  return listOfResults;
}


import fs from 'fs';
import lighthouse from 'lighthouse';
import ChromeLauncher from 'chrome-launcher';

/**
 *  Writes all the files for each report with their corresponding format
 * @param lighthouseResult 
 * @param outputPath 
 * @returns {Promise<>}
 */
async function writeReports(lighthouseResult:Result, outputPath:string) {
  const promises:Promise<void>[] = [];

  if (lighthouseResult?.outputFormats) {
    if (typeof lighthouseResult.outputFormats === 'string') {
      // eslint-disable-next-line no-param-reassign
      lighthouseResult.outputFormats = [lighthouseResult.outputFormats];
    }

    lighthouseResult.outputFormats.forEach((outputType:string, index:number) => {
      // creates a new folder if it's not there
      if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
      }

      promises.push(fs.promises.writeFile(
        `${outputPath}/${lighthouseResult?.fileName}.${outputType}`,
        `${Array.isArray(lighthouseResult?.reports) ? lighthouseResult?.reports[index] : lighthouseResult?.reports}`,
      ));
    });
  }

  return Promise.all(promises);
}
/**
 * runs a ligthouse audit report using chrome 
 * @async
 * @param url
 * @param lhFlags 
 * @param lhConfigs 
 * @param chromeFlags 
 * @returns {Promise<>}
 */
async function lighthouseRunner(url:string, lhFlags:Partial<LH.CliFlags> = {}, lhConfigs:Partial<LH.Config.Json> = { extends: 'lighthouse:default' }, chromeFlags:string[] = []) {
  const chrome = await ChromeLauncher.launch({ chromeFlags });
  // https://github.com/GoogleChrome/lighthouse/blob/888bd6dc9d927a734a8e20ea8a0248baa5b425ed/typings/externs.d.ts#L122
  const runnerResult = await lighthouse(url, { ...lhFlags, port: chrome.port }, lhConfigs);

  await chrome.kill();

  return runnerResult;
}

/**
 * Runs many lighthouse audit reports synchronously for each of the web page or web app configurations passed and returns an array with the result of each report.
 * if decided it can ouput and write the result in the desired file format(.json, .csv, .html) as the lighthouse-cli does.
 * @async
 * @param {WebPage[]} webPagesList list of each webpage or webapp configuration to run the report
 * @param {Partial<LH.CliFlags>} lhrDefaultFlags general lighthouse flags to use if no individual flags passed. 
 * @param {Partial<LH.Config.Json>} lhDefaultConfigs general lighthouse configs to use if no individual configs passed
 * @param {string[]} chromeDefaultFlags general chrome default flags to use if no individual chrome flags passed.
 * @param {string} outputPath path to output the reports if at leats there is one file type configured in flags.output, if no default or individual flag configured then there is no usage 
 * @returns {Promise<Result[]>} an array that contains the result of each lighthouse report
 */
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
    // otherwise the report/chrome would run asynchronously which could impact the analysis
    // Enabling an async execution would imply to know exactly many factors i.e. cores, network etc.
    const analysis = await lighthouseRunner(webPagesList[i].url, lhFlags, lhConfigs, chromeFlags);

    if (analysis?.report && !Array.isArray(analysis.report)) {
      analysis.report = [analysis.report];
    }
 
    const result:Result = {
      fileName: webPagesList[i]?.fileName,
      reports: analysis?.report,
      lhr: analysis.lhr,
      outputFormats: lhFlags?.output,
    };

    listOfResults.push(result);

    if (lhFlags?.output && lhFlags?.output?.length > 0) {
      await writeReports(result, outputPath);
    }
  }

  return listOfResults;
}


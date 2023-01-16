interface Result {
  fileName: string,
  reports: string|string[],
  lhr: LH.Result,
  outputFormats?: string|string[]
}

interface WebPage {
  url: string
  fileName: string,
  configs?: Partial<LH.Config.Json>
  flags?: Partial<LH.CliFlags>
}

interface GetReportsParams {
  webPagesList: WebPage[],
  lhrDefaultFlags: Partial<LH.CliFlags>,
  lhDefaultConfigs: Partial<LH.Config.Json>
  chromeDefaultFlags: string[],
  outputPath: string
}

function getReports(reportParams: GetReportsParams): Result[]

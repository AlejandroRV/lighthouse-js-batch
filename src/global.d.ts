interface Result {
  name: string,
  reports: string|string[],
  lhr: LH.Result,
  output?: string|string[]
}

interface WebPage {
  url: string
  name: string
  execute?: number // not implemented yet
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

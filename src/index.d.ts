interface LBResult {
  fileName?: string,
  /** The string reports in their corresponing format (JSON, CSV, html), this is the raw string to create the reports  */
  reports?: string|string[],
  /** The JS object of the result of the lighthouse report */
  lhr: LH.Result,
  outputFormats?: string|string[]
}

interface UrlSetup{
  url: string
  fileName: string,
  configs?: Partial<LH.Config.Json>
  flags?: Partial<LH.CliFlags>
}

interface RunAuditsParams {
  urls: UrlSetup[],
  lhrDefaultFlags: Partial<LH.CliFlags>,
  lhrDefaultConfigs: Partial<LH.Config.Json>
  chromeDefaultFlags: string[],
  outputPath: string
}

function runAudits(parameters: RunAuditsParams): LBResult[]

export {
  runAudits,
  RunAuditsParams,
  LBResult,
  UrlSetup,
}
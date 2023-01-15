/// <reference types="lighthouse/types/global-lh" />

// types extracted from https://github.com/GoogleChrome/lighthouse/blob/da3c865d698abc9365fa7bb087a08ce8c89b0a05/cli/run.js#L215
declare module 'lighthouse' {
  function lighthouse(
    url: string,
    flags: Partial<LH.CliFlags>,
    configs: Partial<LH.Config.Json>,
  ): Promise<LH.RunnerResult>;
  export = lighthouse;
}

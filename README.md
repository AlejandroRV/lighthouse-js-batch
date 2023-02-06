# lighthouse-js-batch

A Node JS package that allows you to run multiple Lighthouse audit reports programmatically for multiple URLs. With this package, you can specify global or individual configurations per URL. You also can manipulate the resulting Lighthouse JS object and decide whether to output all reports or just use the JS object for other purposes.

## When to use this package

This package is ideal for you if you want to run one or multiple Lighthouse audit reports programmatically as a Node module. The package comes with the necessary setup as indicated in the docs of [using Lighthouse programmatically](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#using-programmatically) for running Chrome using [chrome-launcher](https://www.npmjs.com/package/chrome-launcher) and using [Lighthouse](https://www.npmjs.com/package/lighthouse) as a Node module, which gives you the ability to pass the Lighthouse flags, configs, and Chrome flags.

Here are some good use cases for this package:

- Auditing multiple sites or URLs, to gather more than one report. (runs synchronously and in order)
- Handle the Lighthouse results using Javascript.
- Avoid outputting the results into report files and handle the results by yourself using Javascript. (Just don't pass any output data in the output flags field)
- Ability to output corresponding file reports (CSV, JSON, and HTML) like the CLI.
- Dynamic file name output reports, such as `fileName: `your_dynamic_filename_report_${new Date().toISOString()}`` (extensions are determined by the output format field)
- Running audits with general configs, avoiding the need to create individual configs each time
- Running individual configs on each URL/site passed

## Installation

To install `lighthouse-js-batch`, you can use npm or yarn:

```bash
npm install lighthouse-js-batch
```

```bash
yarn add lighthouse-js-batch
```

## Usage

```javascript
const { runAudits } = require('lighthouse-js-batch');

runAudits({ urls, options }).then(results => {
  // do something with the results
});
```
## CommonJS (CJS)
```js
const ljsb = require('lighthouse-js-batch');

ljsb.runAudits({ urls, lhrDefaultFlags, lhrDefaultConfigs,chromeDefaultFlags, outputPath  }).then((results) => {
  // do something with the results
});

```
## ECMAScript Modules (ESM)
```js
import { runAudits } from 'lighthouse-js-batch';

runAudits({ urls, lhrDefaultFlags, lhrDefaultConfigs,chromeDefaultFlags, outputPath  }).then((results) => {
  // do something with the results
});
```

## Parameters and Types of runAudits
- `parameters`: an object of type `RunAuditsParams`

### Return Value
An array of type `LBResult[]`

### RunAuditsParams
An object with the following properties:
- `urls`: an array of type `UrlSetup[]`
- `lhrDefaultFlags`: a `Partial<LH.CliFlags>` object, default flags for the lighthouse reports
- `lhrDefaultConfigs`: a `Partial<LH.Config.Json>` object, default configurations for the lighthouse reports
- `chromeDefaultFlags`: an array of strings, default flags for chrome
- `outputPath`: a string, output path

### UrlSetup
An object with the following properties:
- `url`: a string, URL to run the audit on
- `fileName`: a string, name of the file
- `configs`: an optional `Partial<LH.Config.Json>` object, configurations for the lighthouse report for this URL
- `flags`: an optional `Partial<LH.CliFlags>` object, flags for the lighthouse report for this URL

### LBResult
An object with the following properties:
- `fileName`: an optional string, name of the file
- `reports`: an optional string or array of strings, string reports in the corresponding format (JSON, CSV, html)
- `lhr`: a required `LH.Result` object, JS object of the result of the lighthouse report
- `outputFormats`: an optional string or array of strings, the output format of the report.

## Contributing
If you want to contribute to the development of lighthouse-js-batch, please feel free to submit a pull request or open an issue. We welcome contributions of all kinds!

## Note
Important links from the lighthouse repo

- For more info on configurations take a look at the doc [lighthouse configuration](https://github.com/GoogleChrome/lighthouse/blob/main/docs/configuration.md).

- Notice that we use flags and configs, but those can be slightly different from the CLI, for more info check [Differences from CLI flags](https://github.com/GoogleChrome/lighthouse/blob/HEAD/docs/readme.md#differences-from-cli-flags).
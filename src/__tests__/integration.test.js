import { expect } from 'chai';
import { runAudits } from '../../lib/esm/index.js';

describe('runAudits', () => {
  it('should return an array of LBResult objects', (done) => {
    const parameters = {
      urls: [
        {
          url: 'https://arodriguezv.me',
          fileName: 'example',
        },
      ],
      lhrDefaultFlags: {},
      lhrDefaultConfigs: {},
      chromeDefaultFlags: ['--headless'],
      outputPath: './output',
    };

    runAudits(parameters).then((result) => {
      expect(result).to.be.an('array');
      expect(result[0]).to.have.property('fileName', 'example');
      expect(result[0]).to.have.property('lhr').that.is.an('object');
      done();
    });
  });
});

'use strict';

const assert = require('assertthat');
const determineExecutableVersion = require('../lib/index');

suite('determineExecutableVersion', () => {
  test('is a function', (done) => {
    assert.that(determineExecutableVersion).is.ofType('function');
    done();
  });

  test('errors if given no exeFile to execute', async () => {
    await assert.that(async () => {
      await determineExecutableVersion({ something: true });
    }).is.throwingAsync();
  });

  test('errors if the exeFile cannot be spawned', async () => {
    await assert.that(async () => {
      await determineExecutableVersion({ exeFile: 'nonexistentBinary123' });
    }).is.throwingAsync();
  });

  test('errors if maxBytes is not of type number', async () => {
    await assert.that(async () => {
      await determineExecutableVersion({ exeFile: process.argv[0], maxBytes: false });
    }).is.throwingAsync();
  });

  test('errors if exeArguments is not an array', async () => {
    await assert.that(async () => {
      await determineExecutableVersion({ exeFile: process.argv[0], exeArguments: '--version' });
    }).is.throwingAsync();
  });

  test('truncates output to maxBytes length', async () => {
    const nodeOutput = await determineExecutableVersion({ exeFile: process.argv[0], maxBytes: 2, exeArguments: '--version' });

    assert.that(nodeOutput.length).is.equalTo(2);
  });
});

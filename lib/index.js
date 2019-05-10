'use strict';

const spawn = require('child_process').spawn;

const determineExecutableVersion = async function (options) {
  if (!options) {
    throw new Error('options are missing.');
  }

  if (!options.exeFile) {
    throw new Error('options.exeFile must not be missing.');
  }

  if (options.exeArguments && options.exeArguments.length === undefined) {
    throw new Error('options.arguments must be an array.');
  }

  if (options.maxBytes !== undefined && typeof options.maxBytes !== 'number') {
    throw new Error('options.maxBytes must be a number.');
  }

  const exeFile = options.exeFile;

  let exeArguments;

  if (options.exeArguments) {
    exeArguments = options.exeArguments;
  } else {
    exeArguments = ['--version'];
  }

  const maxBytes = typeof options.maxBytes === 'number' ? options.maxBytes : 128;

  return new Promise((resolve, reject) => {
    const childProcess = spawn(exeFile, exeArguments, { detached: false });
    let stdoutBuf = '';

    childProcess.stdout.on('data', (chunk) => {
      stdoutBuf += chunk.toString('utf8');
    });

    childProcess.stdout.once('end', () => {
      return resolve(stdoutBuf.trim().substr(0, maxBytes));
    });

    childProcess.once('exit', () => {
      return resolve(stdoutBuf.trim().substr(0, maxBytes));
    });

    childProcess.once('error', () => {
      return reject(new Error(`Could not spawn ${exeFile} ${exeArguments.join(' ')}.`));
    });
  });
};

module.exports = determineExecutableVersion;

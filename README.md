# @sealsystems/determine-executable-version
[![CircleCI](https://circleci.com/gh/sealsystems/node-determine-executable-version.svg?style=svg)](https://circleci.com/gh/sealsystems/node-determine-executable-version)

Calls an executable and returns the version information it writes to stdout.

# Installation

```bash
$ npm install seal-determine-executable-version
```

# Usage

```javascript
const determineExecutableVersion = require('seal-determine-executable-version');
const options = {
  exeFile: '/bin/bash',
  maxBytes: 128,
  arguments: ['--version']
  };

const versionString = await determineExecutableVersion(options);


```

Parameters:

- ```exeFile``` The full path to the executable file whose version shall be determined. Required option.
- ```maxBytes``` The maximum number of bytes to return from the output; output which is longer is truncated. Default: ```128```
- ```arguments``` The argument list to call the executable file with. Default: ```['--version']```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ bot
```

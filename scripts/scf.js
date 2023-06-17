const { writeFileSync } = require('fs');
const { resolve } = require('path');

const pkg = require('../package.json');

const outDir = resolve(__dirname, '../scf');

writePackageFile();
writeScfBootstrap();

function writePackageFile() {
  writeFileSync(
    resolve(outDir, 'package.json'),
    JSON.stringify({
      dependencies: pkg.dependencies,
    }),
  );
}

function writeScfBootstrap() {
  writeFileSync(
    resolve(outDir, 'scf_bootstrap'),
    `
#!/bin/bash
/var/lang/node16/bin/node app.js
`.trim(),
  );
}

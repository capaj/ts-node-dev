const resolve = require('resolve').sync;

module.exports = function (main) {
  const opts = {
    basedir: process.cwd(),
    paths: [process.cwd()]
  }
  try {
    return resolve(main + '.ts', opts);
  } catch (e) {
    try {
      return resolve(main + '/index.ts', opts);
    } catch (e) {
      return resolve(main, opts);
    }
  }
};

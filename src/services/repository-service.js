const git = require('nodegit');
const os = require('os');

const clone = (repository) => {
  return new Promise(async (resolve, reject) => {
    const now = new Date();
    const dir = `${os.tmpdir()}/${now.getTime()}`;

    try {
      await git.Clone(`https://github.com/${repository}`, `${os.tmpdir()}/${now.getTime()}`);
      resolve({
        dir,
        name: repository,
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  clone,
};

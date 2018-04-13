const git = require('nodegit');
const os = require('os');

const clone = (repository) => {
  const now = new Date();
  console.log(`Starting to clone https://github.com/${repository} on ${os.tmpdir()}/${now.getTime()}`);
  return git.Clone(`https://github.com/${repository}`, `${os.tmpdir()}/${now.getTime()}`);
};

module.exports = {
  clone,
}

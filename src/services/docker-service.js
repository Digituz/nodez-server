const Docker = require('dockerode');
const tar = require('tar');
const {readFileSync, writeFileSync} = require('fs');

const docker = new Docker({socketPath: '/var/run/docker.sock'});

const buildImage = (repository, port) => {
  return new Promise(async (resolve, reject) => {
    const dockerfileTemplate = readFileSync(`${__dirname}/templates/Dockerfile.template`).toString();

    writeFileSync(`${repository.dir}/Dockerfile`, dockerfileTemplate.replace('${PORT}', port || 3000));

    await tar.c({
        gzip: false,
        cwd: repository.dir,
        file: `${repository.dir}/../digituz-image-files.tar`,
      }, [`./`]
    ).catch(reject);

    docker.buildImage(`${repository.dir}/../digituz-image-files.tar`, {t: repository.name}, (error) => {
      if (error) return reject(error);
      resolve();
    });
  });
};

const run = (repository) => {
  return new Promise(async (resolve, reject) => {
    try {
      const container = await docker.createContainer({
        Image: repository.name,
        AttachStdin: false,
        AttachStdout: true,
        AttachStderr: true,
        PortBindings: {
          "3000/tcp": [{HostPort: "3005"}]
        },
      });
      await container.start();
      resolve();
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  buildImage,
  run,
};

const express = require('express');
const app = express();
const Docker = require('dockerode');

const docker = new Docker({socketPath: '/var/run/docker.sock'});

app.get('/', async (req, res) => {
  docker.listContainers(function (err, containers) {
    if (err) return console.log(err);

    containers.forEach(function (containerInfo) {
      console.log(containerInfo);
      res.send('Hello World!');
    });
  });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

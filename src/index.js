const express = require('express');
const bodyParser = require('body-parser');
const { buildImage, run } = require('./services/docker-service');
const { addProxy } = require('./services/proxy-service');
const { clone } = require('./services/repository-service');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  console.log(`Deploying new container.`, commandDetails);

  const { commandDetails } = req.body;
  let repo;
  try {
    repo = await clone(commandDetails.repository);
  } catch (error) {
    return res.status(400).send({
      message: 'Have you informed a public GitHub repository?'
    });
  }

  console.log(`Finished cloning ${commandDetails.repository}`);

  try {
    await buildImage(repo, commandDetails.port);
    console.log('Built image', commandDetails);

    const containerName = await run(repo, commandDetails.port);
    console.log(`Ran ${containerName}`);

    addProxy(commandDetails.subdomain, containerName, commandDetails.port);
    console.log(`Activated proxy for ${subdomain}`);

    res.send({message: 'done'});
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.listen(3337, '0.0.0.0', () => console.log('Nodez server is listening on port 3337.'));

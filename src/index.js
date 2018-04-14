const express = require('express');
const bodyParser = require('body-parser');
const { buildImage, run } = require('./services/docker-service');
const { clone } = require('./services/repository-service');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { commandDetails } = req.body;
  let repo;
  try {
    repo = await clone(commandDetails.repository);
  } catch (error) {
    return res.status(400).send({
      message: 'Have you informed a public GitHub repository?'
    });
  }

  try {
    await buildImage(repo);
    await run(repo);
    res.send({message: 'done'});
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

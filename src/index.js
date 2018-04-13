const express = require('express');
const bodyParser = require('body-parser');
const { clone } = require('./repository-service');

const app = express();
app.use(bodyParser.json());

app.post('/', async (req, res) => {
  const { commandDetails } = req.body;
  try {
    const repo = await clone(commandDetails.repository);
    console.log(repo);
    res.send(repo);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));

const express = require('express');
const verifyProof = require('../utils/verifyProof');

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT = '3385f85a7f32152aec10c295f84e9c5532d36b1ada84776dc3cafbfdfdf1336a';

app.post('/gift', (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const name = body.name;
  const proof = body.proof;
  // TODO: prove that a name is in the list
  if (name === undefined) {
    res.status(400).send("ERROR: Empty Name detected");
    return;
  }
  const isInTheList = verifyProof(proof, name, MERKLE_ROOT);
  if (isInTheList) {
    res.send("You got a toy robot!");
  }
  else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

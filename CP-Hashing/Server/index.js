const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 5000;
const m = 1e9 + 9;
const hashArray = new Array(m + 1).fill(false);

app.use(cors());
app.use(bodyParser.json());

function compute_hash(s) {
  const p = 31;
  let hash_value = 0;
  let p_pow = 1;

  for (let i = 0; i < s.length; i++) {
      hash_value = (hash_value + (s.charCodeAt(i) - 'a'.charCodeAt(0) + 1) * p_pow) % m;
      p_pow = (p_pow * p) % m;
  }

  return hash_value;
}

app.post('/insert-username', (req, res) => {
  const { username } = req.body;
  const hash = compute_hash(username);

  if (hashArray[hash]) {
    res.status(400).json({ message: 'Username is already present' });
  } else {
    hashArray[hash] = true;
    res.status(200).json({ message: 'Username inserted successfully' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

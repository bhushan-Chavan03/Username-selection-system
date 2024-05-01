const express = require('express');
const Trie = require('./Trie.js'); 

const app = express();
const port = 3000;
const cors = require('cors');
app.use(cors());


const trie = new Trie();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/insert-username', (req, res) => {
    const { username } = req.body;

    if (!username || typeof username !== 'string') {
        return res.status(400).json({ error: 'Invalid username' });
    }

    const trimmedUsername = username.trim();

    if (trimmedUsername.length === 0) {
        return res.status(400).json({ error: 'Please enter a username' });
    }

    if (trimmedUsername.length < 8 || trimmedUsername.length > 12) {
        return res.status(400).json({ error: 'Username length should be between 8 and 12 characters' });
    }

    if (trie.search(trimmedUsername)) {
        return res.status(400).json({ error: 'Username already exists' });
    }

    trie.insert(trimmedUsername);
    return res.json({ message: 'Username inserted successfully' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

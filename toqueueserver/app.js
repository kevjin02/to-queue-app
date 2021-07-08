const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const qItems = require('./routes/api/queues');

/**
 * Create server with express framework and api/queues route for toQueue frontend.
 */

const app = express();


connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Server working.'));

app.use('/api/queues', qItems);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));
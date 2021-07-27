const express = require('express');
const connectDB = require('./config/db');
var cors = require('cors');

const path = require('path')
const qItems = require('./routes/api/queues');

/**
 * Create server with express framework and api/queues route for toQueue frontend.
 */

const app = express();

app.use(express.static(path.join(__dirname, '../toqueue/build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../toqueue/build'))
})

connectDB();

app.use(cors({ origin: true, credentials: true }));

app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('Server working.'));

app.use('/api/queues', qItems);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
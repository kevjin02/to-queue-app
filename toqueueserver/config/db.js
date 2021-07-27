const mongoose = require('mongoose');
const config = require('config');
// const db = config.get('mongoURI');
require('dotenv').config()

/**
 * Connects to database or exits process.
 */
const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.mongoURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        console.log('MongoDB is Connected...');
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
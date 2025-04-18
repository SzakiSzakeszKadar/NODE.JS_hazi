const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/OCAYIY', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log(`MongoDB kapcsolat létrejött: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Hiba az adatbázis kapcsolatban: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

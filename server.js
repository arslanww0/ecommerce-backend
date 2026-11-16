require('dotenv').config();

const app = require('./app/app');
const { connection, connectDB } = require('./app/config/db');

require('./app/models/dbModel');

const PORT = process.env.PORT;

const asyndb = async () => {
    await connectDB();
    await connection.sync({});
    app.listen(PORT, (() => {
        console.log(`Server Start on http://localhost:${PORT}`);
    }))
}
asyndb();
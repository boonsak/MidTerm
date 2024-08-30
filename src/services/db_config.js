const dotenv = require("dotenv");
dotenv.config({ path: './configs/.env' });

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: false,
        trustedconnection: true,
        enableArithAbort: true,
        instancename: process.env.DB_INSTANCE
    },
    port: parseInt(process.env.DB_PORT)
}

module.exports = config;
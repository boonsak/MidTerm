const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config({ path: './configs/.env' });

const saltRounds = parseInt(process.env.SALT_ROUNDS);

async function encrypt(password) {
    return await bcrypt.hash(password, saltRounds);
}

async function compare(password, hashedPassword) {
    return bcrypt.compareSync(password, hashedPassword);
}

async function getSystemDate() {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 7);
    return currentDate;
}

module.exports = {
    encrypt,
    compare,
    getSystemDate
}
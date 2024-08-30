const mssql = require("mssql");
const jwt = require("jsonwebtoken");
const speakeasy = require("speakeasy");
const nodemailer = require("nodemailer");
//const db_config = require("../services/db_config");
const dotenv = require("dotenv");
const user = require("./user_controller");
const roleDtl = require("./roleDtl_controller");
const utility = require("../utils/utility");

dotenv.config({ path: "./configs/.env" });

async function signup(newUser) {
    try {
        return await user.insert(newUser);
    } catch (error) {
        throw error;
    }
}

async function signIn(signIn) {
    const { user_id, password } = signIn;
    const secretKey = process.env.SECRET_KEY;
    const tokenExpire = process.env.TOKEN_EXPIRE;

    if (!user_id || !password) {
        return { status: 400, message: "User id and password is required" }
    }

    const signInUser = await user.getUserById(user_id);

    if (signInUser) {
        const hashedPassword = signInUser.password;
        const isPass = await utility.compare(password, hashedPassword);
        if (isPass) {
            const token = jwt.sign({ id: signInUser.user_id, role: signInUser.role }, secretKey, { expiresIn: tokenExpire });
            return { status: 200, token: token }
        } else {
            return { status: 401, message: "Invalid credentials" }
        }
    }
    else {
        return { status: 401, message: "Invalid credentials" }
    }
}

async function generateOTP() {
    //const secret = await speakeasy.generateSecret({ length: 30 });
    //console.log(secret.base32);

    const otp = await speakeasy.totp({
        secret: process.env.OTP_SECRET,
        encoding: process.env.OTP_ENCODING,
        step: 3000
    });
    return otp;
}

async function sendOTPViaEmail(email, otp) {
    try {
        if (!email) {
            return { status: 400, message: "Email is required" };
        }

        /*
        const transport = nodemailer.createTransport({
            host: "smtp.office365.com",
            port: 587,
            secure: false,
            auth: {
                user: "info@cdscom.co.th",
                pass: "CdsBill@123"
            }
        });

        const mailOptions = {
            form: "info@cdscom.co.th",
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is : ${otp}`
        };
        */

        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === "false" ? false : true,
            auth: {
                user: process.env.SMTP_SENDER_EMAIL,
                pass: process.env.SMTP_SENDER_PASS
            }
        });

        const mailOptions = {
            form: process.env.SMTP_SENDER_EMAIL,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is : ${otp}`
        };

        try {
            const info = await transport.sendMail(mailOptions);

            return { status: 200, message: "OTP send successfully" };
        } catch (error) {
            return { status: 500, message: "Error sending email : " + error.message };
        }
    } catch (error) {
        return { status: 500, message: "Failed to send OTP" };
    }
}

async function verifyOTP(otp) {
    const isVerified = await speakeasy.totp.verify({
        secret: process.env.OTP_SECRET,
        encoding: process.env.OTP_ENCODING,
        step: 3000,
        token: otp
        //window: 2,
    });

    if (isVerified) {
        return { status: 200, message: "Valid OTP" };
    } else {
        return { status: 400, message: "Invalid OTP" };
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        const token = authHeader.replace("Bearer ", "");
        const secretKey = process.env.SECRET_KEY;

        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Failed to authenticate token" });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(403).json({ message: "No token provided", error_message: error.message });
    }
}

const verifyRole = (roles) => async (req, res, next) => {
    const role = req.user.role;
    const programCode = roles[0];
    const action = roles[1];
    let where_clause = `ROLE = '${role}' AND PROGRAM_CODE = '${programCode}'`;

    switch (action) {
        case "ACCESS":
            where_clause += " AND IS_ACCESS = 1";
            break;

        case "INSERT":
            where_clause += " AND IS_INSERT = 1";
            break;

        case "DELETE":
            where_clause += " AND IS_DELETE = 1";
            break;

        case "UPDATE":
            where_clause += " AND IS_UPDATE = 1";
            break;

        default:
            break;
    }

    const param = { where_clause: where_clause, order_by: "", top: 0 };
    const roleDtls = await roleDtl.getRoleDtl(param);

    if (roleDtls && roleDtls.length > 0) {
        next();
    } else {
        return res.status(401).json({ message: "You don't have permission to perform this action" })
    }
};

module.exports = {
    signup,
    signIn,
    generateOTP,
    sendOTP: sendOTPViaEmail,
    verifyOTP,
    verifyToken,
    verifyRole,
}
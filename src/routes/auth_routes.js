const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller");

/**
 * @swagger
 * /api/v1/auth/signup:
 *   post:
 *     tags:
 *     - Auth controller
 *     summary: Create new user
 *     responses:
 *       201:
 *         description: Created
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                   - user_id
 *                   - password
 *                   - first_name
 *                   - last_name
 *                   - email
 *                   - role
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: admin007
 *                 password:
 *                   type: string
 *                   example: password
 *                 first_name:
 *                   type: string
 *                   example: Firstname
 *                 last_name:
 *                   type: string
 *                   example: Lastname
 *                 email:
 *                   type: string
 *                   example: abcd@hotmail.com
 *                 role:
 *                   type: string
 *                   example: Admin
 */
router.route("/auth/signup").post(async (req, res) => {
    try {
        const newUser = req.body;
        const result = await auth.signup(newUser);
        if (result.status === 201) {
            res.status(result.status).json(result.data);
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/auth/signin:
 *   post:
 *     tags:
 *     - Auth controller
 *     summary: Login as a user
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                   - user_id
 *                   - password
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: user007
 *                 password:
 *                   type: string
 *                   example: password
 */
router.route("/auth/signin").post(async (req, res) => {
    try {
        const signIn = req.body;
        const result = await auth.signIn(signIn);
        if (result.status === 200) {
            res.status(result.status).json({ token: result.token });
        } else {
            res.status(result.status).json({ message: result.message });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/auth/send-otp:
 *   post:
 *     tags:
 *     - Auth controller
 *     summary: send OTP with email
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                   - email
 *               properties:
 *                 email:
 *                   type: string
 *                   example: abcd@hotmail.com
 */
router.route("/auth/send-otp").post(async (req, res) => {
    try {
        const { email } = req.body;
        const otp = await auth.generateOTP();

        const result = await auth.sendOTP(email, otp);

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/auth/verify-otp:
 *   post:
 *     tags:
 *     - Auth controller
 *     summary: verify OTP
 *     responses:
 *       200:
 *         description: OK 
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                   - otp
 *               properties:
 *                 otp:
 *                   type: string
 *                   example: 952076
 */
router.route("/auth/verify-otp").post(async (req, res) => {
    try {
        const { otp } = req.body;
        const result = await auth.verifyOTP(otp);

        res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

module.exports = router;

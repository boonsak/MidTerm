const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller")
const user = require("../controllers/user_controller");

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *     - User controller
 *     summary: Get users
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                   - where_clause
 *                   - order_by
 *                   - top
 *               properties:
 *                 where_clause:
 *                   type: string
 *                   example: role = 'Admin'
 *                 order_by:
 *                   type: string
 *                   example: user_id
 *                 top:
 *                   type: number
 *                   example: 0
 */
router.route("/users").get(auth.verifyToken, auth.verifyRole(["SEC01", "ACCESS"]), async (req, res) => {
    try {
        const param = req.body;
        const result = await user.getUser(param);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ message: result.message });
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/users/{userId}:
 *  get:
 *     tags:
 *     - User controller
 *     summary: Get user by user id
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user id of the user
 *        required: true
 */
router.route("/users/:userId").get(auth.verifyToken, auth.verifyRole(["SEC01", "ACCESS"]), async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await user.getUserById(userId);

        if (result) {
            res.status(200).json(result);
        } else {
            res.status(result.status).json({ message: result.message });
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/users/:
 *   post:
 *     tags:
 *     - User controller
 *     summary: Insert a user
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
 *                   example: user007
 *                 password:
 *                   type: string
 *                   example: 1234567890
 *                 first_name:
 *                   type: string
 *                   example: Firstname
 *                 last_name:
 *                   type: string
 *                   example: Lastname
 *                 email:
 *                   type: string
 *                   example: abcs@hotmail.com
 *                 role:
 *                   type: string
 *                   example: User
 */
router.route("/users/").post(auth.verifyToken, auth.verifyRole(["SEC01", "INSERT"]), async (req, res) => {
    try {
        const newUser = req.body;
        const result = await user.insert(newUser);
        res.status(201).json(result.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/users:
 *   put:
 *     tags:
 *     - User controller
 *     summary: Modify a user
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
 *                   - user_id
 *                   - password
 *                   - first_name
 *                   - last_name
 *                   - email
 *                   - role
 *               properties:
*                 user_id:
 *                   type: string
 *                   example: user007
 *                 password:
 *                   type: string
 *                   example: 1234567890
 *                 first_name:
 *                   type: string
 *                   example: Firstname
 *                 last_name:
 *                   type: string
 *                   example: Lastname
 *                 email:
 *                   type: string
 *                   example: abcs@hotmail.com
 *                 role:
 *                   type: string
 *                   example: Admin
 */
router.route("/users").put(auth.verifyToken, auth.verifyRole(["SEC01", "UPDATE"]), async (req, res) => {
    try {
        const editUser = req.body;
        const result = await user.update(editUser);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/users/{userId}:
 *   delete:
 *     tags:
 *     - User controller
 *     summary: Delete user by Id
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: The user id of the user
 *        required: true
 */
router.route("/users/:userId").delete(auth.verifyToken, auth.verifyRole(["SEC01", "DELETE"]), async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await user.delete(userId);
        if (result.status === 200) {
            res.status(200).json({ message: result.message });
            return;
        } else {
            res.status(500).json({ message: result.message, error_message: result.error_message });
            return;
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/users/changepassword:
 *   put:
 *     tags:
 *     - User controller
 *     summary: Change password a user
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
 *                   - user_id
 *                   - old_password
 *                   - new_password 
 *               properties:
 *                 user_id:
 *                   type: string
 *                   example: user007
 *                 old_password:
 *                   type: string
 *                   example: oldpassword
 *                 new_password:
 *                   type: string
 *                   example: newpassword
 */
router.route("/users/changepassword").put(auth.verifyToken, auth.verifyRole(["SEC01", "UPDATE"]), async (req, res) => {
    try {
        const editUser = req.body;
        const result = await user.changePassword(editUser);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller")
const order = require("../controllers/order_controller");

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     tags:
 *     - Order controller
 *     summary: Get orders
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
 *                   example: order_status = 'รอยืนยัน'
 *                 order_by:
 *                   type: string
 *                   example: id
 *                 top:
 *                   type: number
 *                   example: 0
 */
router.route("/orders").get(auth.verifyToken, auth.verifyRole(["TRN01", "ACCESS"]), async (req, res) => {
    try {
        const param = req.body;
        const result = await order.getOrder(param);
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
 * /api/v1/orders/{orderId}:
 *  get:
 *     tags:
 *     - Order controller
 *     summary: Get order by oder id
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 *     parameters:
 *      - name: orderId
 *        in: path
 *        description: The order id of the order
 *        required: true
 */
router.route("/orders/:orderId").get(auth.verifyToken, auth.verifyRole(["TRN01", "ACCESS"]), async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await order.getOrderById(orderId);

        if (result) {
            res.status(200).json(result[0]);
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
 * /api/v1/orders/:
 *   post:
 *     tags:
 *     - Order controller
 *     summary: Insert a order
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
 *                   - order_date
 *                   - order_status
 *               properties:
 *                 order_date:
 *                   type: string
 *                   example: 2024-08-10T10:25:43.253Z
 *                 order_status:
 *                   type: string
 *                   example: รอยืนยัน
 */
router.route("/orders/").post(auth.verifyToken, auth.verifyRole(["TRN01", "INSERT"]), async (req, res) => {
    try {
        const newOrder = req.body;
        newOrder.user_id = req.user.id;
        const result = await order.insert(newOrder);
        res.status(201).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/orders:
 *   put:
 *     tags:
 *     - Order controller
 *     summary: Modify a Order
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
 *                   - order_id
 *                   - order_date
 *                   - order_status
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 1
 *                 order_date:
 *                   type: string
 *                   example: 2024-08-11T13:24:45.253Z
 *                 order_status:
 *                   type: string
 *                   example: ยืนยันแล้ว
 */
router.route("/orders").put(auth.verifyToken, auth.verifyRole(["TRN01", "UPDATE"]), async (req, res) => {
    try {
        const editOrder = req.body;
        editOrder.user_id = req.user.id;
        const result = await order.update(editOrder);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/orders/{orderId}:
 *   delete:
 *     tags:
 *     - Order controller
 *     summary: Delete order by Id
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 *     parameters:
 *      - name: orderId
 *        in: path
 *        description: The order id of the order
 *        required: true
 */
router.route("/orders/:orderId").delete(auth.verifyToken, auth.verifyRole(["TRN01", "DELETE"]), async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const result = await order.delete(orderId);
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

module.exports = router;
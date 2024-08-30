const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth_controller")
const orderDtl = require("../controllers/orderDtl_controller");


/**
 * @swagger
 * /api/v1/orderdtls:
 *   get:
 *     tags:
 *     - Order detail controller
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
 *                   example: order_id = 1
 *                 order_by:
 *                   type: string
 *                   example: item_no
 *                 top:
 *                   type: number
 *                   example: 0
 */
router.route("/orderdtls").get(auth.verifyToken, auth.verifyRole(["TRN02", "ACCESS"]), async (req, res) => {
    try {
        const param = req.body;
        const result = await orderDtl.getOrderDtl(param);
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
 * /api/v1/orderdtls/{orderId}/{itemNo}:
 *  get:
 *     tags:
 *     - Order detail controller
 *     summary: Get order detail by order id, item no
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
 *        description: The order id of the order detail
 *        required: true
 *      - name: itemNo
 *        in: path
 *        description: The item no of the order detail
 *        required: true
 */
router.route("/orderdtls/:orderId/:itemNo").get(auth.verifyToken, auth.verifyRole(["TRN02", "ACCESS"]), async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const itemNo = req.params.itemNo;
        const result = await orderDtl.getOrderDtlById(orderId, itemNo);

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
 * /api/v1/orderdtls/:
 *   post:
 *     tags:
 *     - Order detail controller
 *     summary: Insert a order detail
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
 *                   - order_id
 *                   - item_no
 *                   - product_id
 *                   - unit_price
 *                   - order_quantity
 *                   - total_price
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 1
 *                 item_no:
 *                   type: integer
 *                   example: 1
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 unit_price:
 *                   type: integer
 *                   example: 3
 *                 order_quantity:
 *                   type: number
 *                   example: 50.00
 *                 total_price:
 *                   type: number
 *                   example: 150.00
 */
router.route("/orderdtls/").post(auth.verifyToken, auth.verifyRole(["TRN02", "INSERT"]), async (req, res) => {
    try {
        const newOrder = req.body;
        const result = await orderDtl.insert(newOrder);
        res.status(201).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/orderdtls:
 *   put:
 *     tags:
 *     - Order detail controller
 *     summary: Modify a Order detail
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
 *                   - item_no
 *                   - product_id
 *                   - unit_price
 *                   - order_quantity
 *                   - total_price
 *               properties:
 *                 order_id:
 *                   type: integer
 *                   example: 1
 *                 item_no:
 *                   type: integer
 *                   example: 1
 *                 product_id:
 *                   type: integer
 *                   example: 1
 *                 unit_price:
 *                   type: integer
 *                   example: 15
 *                 order_quantity:
 *                   type: number
 *                   example: 10.00
 *                 total_price:
 *                   type: number
 *                   example: 150.00
 */
router.route("/orderdtls").put(auth.verifyToken, auth.verifyRole(["TRN02", "UPDATE"]), async (req, res) => {
    try {
        const editOrder = req.body;
        const result = await orderDtl.update(editOrder);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/orderdtls/{orderId}/{itemNo}:
 *   delete:
 *     tags:
 *     - Order detail controller
 *     summary: Delete order detail by Id
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 *     parameters:
*      - name: orderId
 *        in: path
 *        description: The order id of the order detail
 *        required: true
*      - name: itemNo
 *        in: path
 *        description: The item no of the order detail
 *        required: true
 */
router.route("/orderdtls/:orderId/:itemNo").delete(auth.verifyToken, auth.verifyRole(["TRN02", "DELETE"]), async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const itemNo = req.params.itemNo;
        const result = await orderDtl.delete(orderId, itemNo);
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
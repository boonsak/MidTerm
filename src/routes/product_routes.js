const express = require("express");
const dotenv = require("dotenv");
const router = express.Router();
const auth = require("../controllers/auth_controller")
const product = require("../controllers/product_controller");


/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags:
 *     - Product controller
 *     summary: Get products
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
 *                   example: product_name = 'product001'
 *                 order_by:
 *                   type: string
 *                   example: id
 *                 top:
 *                   type: number
 *                   example: 0
 */
router.route("/products").get(auth.verifyToken, auth.verifyRole(["MAS01", "ACCESS"]), async (req, res) => {
    try {
        const param = req.body;
        const result = await product.getProduct(param);

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
 * /api/v1/products/{productId}:
 *  get:
 *     tags:
 *     - Product controller
 *     summary: Get product by product id
 *     responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Server Error
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: The product id of the product
 *        required: true
 */
router.route("/products/:productId").get(auth.verifyToken, auth.verifyRole(["MAS01", "ACCESS"]), async (req, res) => {
    try {
        const productId = req.params.productId;
        const result = await product.getProductById(productId);

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
 * /api/v1/products/:
 *   post:
 *     tags:
 *     - Product controller
 *     summary: Insert a product
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
 *                   - product_name
 *                   - description
 *                   - quantity
 *                   - price
 *               properties:
 *                 product_name:
 *                   type: string
 *                   example: product001
 *                 description:
 *                   type: string
 *                   example: xxxxxxxxxxxxxxxx
 *                 quantity:
 *                   type: int
 *                   example: 10
 *                 price:
 *                   type: number
 *                   example: 100.00
 */
router.route("/products/").post(auth.verifyToken, auth.verifyRole(["MAS01", "INSERT"]), async (req, res) => {
    try {
        const newProduct = req.body;
        newProduct.user_id = req.user.id;
        const result = await product.insert(newProduct);
        res.status(201).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});

/**
 * @swagger
 * /api/v1/products:
 *   put:
 *     tags:
 *     - Product controller
 *     summary: Modify a product
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
 *                   - product_Id
 *                   - product_name
 *                   - description
 *                   - quantity
 *                   - price
 *               properties:
 *                 product_Id:
 *                   type: integer
 *                   example: 1
 *                 product_name:
 *                   type: string
 *                   example: product-X
 *                 description:
 *                   type: string
 *                   example: product for test
 *                 quantity:
 *                   type: integer
 *                   example: 50
 *                 price:
 *                   type: number
 *                   example: 200
 */
router.route("/products").put(auth.verifyToken, auth.verifyRole(["MAS01", "UPDATE"]), async (req, res) => {
    try {
        const editProduct = req.body;
        editProduct.user_id = req.user.id;
        const result = await product.update(editProduct);
        res.status(200).json(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error_message: error.message });
    }
});


/**
 * @swagger
 * /api/v1/products/{productId}:
 *   delete:
 *     tags:
 *     - Product controller
 *     summary: Delete product by Id
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Server Error
 *     parameters:
 *      - name: productId
 *        in: path
 *        description: The product id of the product
 *        required: true
 */
router.route("/products/:productId").delete(auth.verifyToken, auth.verifyRole(["MAS01", "DELETE"]), async (req, res) => {
    try {
        const productId = req.params.productId;
        const result = await product.delete(productId);
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
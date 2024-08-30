const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
//const bodyParser = require("body-parser");
//const swaggerJsdoc = require("swagger-jsdoc");
//const swaggerUi = require("swagger-ui-express");
const { swaggerSpec, swaggerUi } = require('./src/services/swagger');
const dotenv = require("dotenv");
const routeAuth = require("./src/routes/auth_routes");
const routeUser = require("./src/routes/user_routes");
const routeProduct = require("./src/routes/product_routes");
const routeOrder = require("./src/routes/order_routes");
const routeOrderDtl = require("./src/routes/orderDtl_routes");
dotenv.config({ path: "./configs/.env" });

const port = process.env.PORT;
const version = process.env.VERSION;
const secretKey = process.env.SECRET_KET;

const app = express();
const router = express.Router();

//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

/*
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World" });
});
*/

app.use(version, router);
app.use(version, routeAuth);
app.use(version, routeUser);
app.use(version, routeProduct);
app.use(version, routeOrder);
app.use(version, routeOrderDtl);

/*
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Mid-Term API",
            version: "1.0.0",
            description: "Mid-Term API Document",
        },
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    //apis: ["server.js"]
    apis: ["./src/routes/*.js"]
};
*/

/*
const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
*/

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
    console.log("Server is running on port http://localhost:%s", port);
})
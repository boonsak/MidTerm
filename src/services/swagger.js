const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

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
    apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = {
    swaggerSpec,
    swaggerUi,
};
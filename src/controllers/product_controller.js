const mssql = require("mssql");
const db_config = require("../services/db_config");
const utility = require("../utils/utility");

async function getProduct(param) {
    const { where_clause, order_by, top } = param;

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('WHERE_CLAUSE', mssql.VarChar, where_clause)
            .input('ORDER_BY', mssql.VarChar, order_by)
            .input('TOP', mssql.Int, top)
            .execute('USP_PRODUCT_FND', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0] || null);
            });
    });
}

async function getProductById(productId) {
    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('ID', mssql.BigInt, productId)
            .execute('USP_PRODUCT_GET_BY_PK', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0]);
            });
    });
}

async function ins(product) {
    const { product_name, description, quantity, price, user_id } = product;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .output("ID", mssql.BigInt, 0)
            .input("PRODUCT_NAME", mssql.VarChar, product_name)
            .input("DESCRIPTION", mssql.VarChar, description)
            .input("QUANTITY", mssql.Int, quantity)
            .input("PRICE", mssql.Numeric(9, 2), price)
            .input("CREATE_DATE", mssql.DateTime, currentDate)
            .input("CREATE_USER", mssql.VarChar, user_id)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_PRODUCT_INS', (error, result) => {
                if (error) return reject(error);
                const json = {
                    product_id: result.output.ID,
                    product_name: product_name,
                    description: description,
                    quantity: quantity,
                    price: price
                };
                resolve(json);
            });
    });
}

async function upd(product) {
    const { product_id, product_name, description, quantity, price, user_id } = product;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("ID", mssql.VarChar, product_id)
            .input("PRODUCT_NAME", mssql.VarChar, product_name)
            .input("DESCRIPTION", mssql.VarChar, description)
            .input("QUANTITY", mssql.Int, quantity)
            .input("PRICE", mssql.Numeric(9, 2), price)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_PRODUCT_UPD', (error, result) => {
                if (error) return reject(error);
                const json = {
                    id: product_id,
                    product_name: product_name,
                    description: description,
                    quantity: quantity,
                    price: price
                };
                resolve(json);
            });
    });
}

async function del(productId) {
    try {
        let pool = await mssql.connect(db_config);

        return new Promise((resolve, reject) => {
            pool.request()
                .input('ID', mssql.BigInt, productId)
                .execute('USP_PRODUCT_DEL', (error, result) => {
                    if (error) return reject(error);
                    resolve({ status: 200, message: "Deleted successfully" });
                });
        });
    } catch (error) {
        return { status: 500, message: "Error occurred while retrieving data", error_message: error.message }
    }
}

module.exports = {
    getProduct,
    getProductById,
    insert: ins,
    update: upd,
    delete: del
}
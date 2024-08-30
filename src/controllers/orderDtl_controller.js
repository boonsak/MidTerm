const mssql = require("mssql");
const db_config = require("../services/db_config");
const utility = require("../utils/utility");

async function getOrderDtl(param) {
    const { where_clause, order_by, top } = param;

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('WHERE_CLAUSE', mssql.VarChar, where_clause)
            .input('ORDER_BY', mssql.VarChar, order_by)
            .input('TOP', mssql.Int, top)
            .execute('USP_ORDER_DTL_FND', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0] || null);
            });
    });
}

async function getOrderDtlById(orderId, itemNo) {
    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('ORDER_ID', mssql.BigInt, orderId)
            .input('ITEM_NO', mssql.SmallInt, itemNo)
            .execute('USP_ORDER_DTL_GET_BY_PK', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0]);
            });
    });
}

async function ins(orderDtl) {
    const { order_id, item_no, product_id, unit_price, order_quantity, total_price } = orderDtl;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("ORDER_ID", mssql.BigInt, order_id)
            .input("ITEM_NO", mssql.SmallInt, item_no)
            .input("PRODUCT_ID", mssql.BigInt, product_id)
            .input("UNIT_PRICE", mssql.Numeric(9, 2), unit_price)
            .input("ORDER_QUANTITY", mssql.Int, order_quantity)
            .input("TOTAL_PRICE", mssql.Numeric(11, 2), total_price)
            .execute('USP_ORDER_DTL_INS', (error, result) => {
                if (error) return reject(error);
                const json = {
                    order_id: order_id,
                    item_no: item_no,
                    product_id: product_id,
                    unit_price: unit_price,
                    order_quantity: order_quantity,
                    total_price: total_price
                };
                resolve(json);
            });
    });
}

async function upd(orderDtl) {
    const { order_id, item_no, product_id, unit_price, order_quantity, total_price } = orderDtl;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("ORDER_ID", mssql.BigInt, order_id)
            .input("ORIGINAL_ORDER_ID", mssql.BigInt, order_id)
            .input("ITEM_NO", mssql.SmallInt, item_no)
            .input("ORIGINAL_ITEM_NO", mssql.SmallInt, item_no)
            .input("PRODUCT_ID", mssql.BigInt, product_id)
            .input("UNIT_PRICE", mssql.Numeric(9, 2), unit_price)
            .input("ORDER_QUANTITY", mssql.Int, order_quantity)
            .input("TOTAL_PRICE", mssql.Numeric(11, 2), total_price)
            .execute('USP_ORDER_DTL_UPD', (error, result) => {
                if (error) return reject(error);
                const json = {
                    order_id: order_id,
                    item_no: item_no,
                    product_id: product_id,
                    unit_price: unit_price,
                    order_quantity: order_quantity,
                    total_price: total_price
                };
                resolve(json);
            });
    });
}

async function del(orderId, itemNo) {
    try {
        let pool = await mssql.connect(db_config);

        return new Promise((resolve, reject) => {
            pool.request()
                .input('ORDER_ID', mssql.BigInt, orderId)
                .input('ITEM_NO', mssql.SmallInt, itemNo)
                .execute('USP_ORDER_DTL_DEL', (error, result) => {
                    if (error) return reject(error);
                    resolve({ status: 200, message: "Deleted successfully" });
                });
        });
    } catch (error) {
        return { status: 500, message: "Error occurred while retrieving data", error_message: error.message }
    }
}

module.exports = {
    getOrderDtl,
    getOrderDtlById,
    insert: ins,
    update: upd,
    delete: del
}
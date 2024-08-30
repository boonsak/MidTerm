const mssql = require("mssql");
const db_config = require("../services/db_config");
const utility = require("../utils/utility");

async function getOrder(param) {
    const { where_clause, order_by, top } = param;

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('WHERE_CLAUSE', mssql.VarChar, where_clause)
            .input('ORDER_BY', mssql.VarChar, order_by)
            .input('TOP', mssql.Int, top)
            .execute('USP_ORDER_FND', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0] || null);
            });
    });
}

async function getOrderById(orderId) {
    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('ID', mssql.BigInt, orderId)
            .execute('USP_ORDER_GET_BY_PK', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0]);
            });
    });
}

async function ins(order) {
    const { order_date, order_status, user_id } = order;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .output("ID", mssql.BigInt, 0)
            .input("ORDER_DATE", mssql.DateTime, order_date)
            .input("ORDER_STATUS", mssql.VarChar, order_status)
            .input("ORDER_USER_ID", mssql.VarChar, user_id)
            .input("CREATE_DATE", mssql.DateTime, currentDate)
            .input("CREATE_USER", mssql.VarChar, user_id)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_ORDER_INS', (error, result) => {
                if (error) return reject(error);
                const json = {
                    order_id: result.output.ID,
                    order_date: order_date,
                    order_status: order_status,
                    order_user_id: user_id
                };
                resolve(json);
            });
    });
}

async function upd(order) {
    const { order_id, order_date, order_status, user_id } = order;

    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("ID", mssql.BigInt, order_id)
            .input("ORDER_DATE", mssql.DateTime, order_date)
            .input("ORDER_STATUS", mssql.VarChar, order_status)
            .input("ORDER_USER_ID", mssql.VarChar, user_id)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_ORDER_UPD', (error, result) => {
                if (error) return reject(error);
                const json = {
                    order_date: order_date,
                    order_status: order_status,
                    order_user_id: user_id
                };
                resolve(json);
            });
    });
}

async function del(orderId) {
    try {
        let pool = await mssql.connect(db_config);

        return new Promise((resolve, reject) => {
            pool.request()
                .input('ID', mssql.BigInt, orderId)
                .execute('USP_ORDER_DEL', (error, result) => {
                    if (error) return reject(error);
                    resolve({ status: 200, message: "Deleted successfully" });
                });
        });
    } catch (error) {
        return { status: 500, message: "Error occurred while retrieving data", error_message: error.message }
    }
}

module.exports = {
    getOrder,
    getOrderById,
    insert: ins,
    update: upd,
    delete: del
}
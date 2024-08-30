const mssql = require("mssql");
const db_config = require("../services/db_config");
const utility = require("../utils/utility");

async function getRoleDtl(param) {
    const { where_clause, order_by, top } = param;

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('WHERE_CLAUSE', mssql.VarChar, where_clause)
            .input('ORDER_BY', mssql.VarChar, order_by)
            .input('TOP', mssql.Int, top)
            .execute('USP_ROLE_DTL_FND', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0] || null);
            });
    });
}

module.exports = {
    getRoleDtl
}
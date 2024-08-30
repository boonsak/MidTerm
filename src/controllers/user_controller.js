const mssql = require("mssql");
const db_config = require("../services/db_config");
const utility = require("../utils/utility");
const http = require('http');

async function getUser(param) {
    const { where_clause, order_by, top } = param;

    if (where_clause === undefined || order_by === undefined || top === undefined) {
        return { status: 400, message: "where clause, order by and top is required" };
    }

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('WHERE_CLAUSE', mssql.VarChar, where_clause)
            .input('ORDER_BY', mssql.VarChar, order_by)
            .input('TOP', mssql.Int, top)
            .execute('USP_USER_FND', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0] || null);
            });
    });
}

async function getUserById(userId) {
    if (!userId) {
        return { status: 400, message: "User id is required" };
    }

    let pool = await mssql.connect(db_config);

    return new Promise((resolve, reject) => {
        pool.request()
            .input('USER_ID', mssql.VarChar, userId)
            .execute('USP_USER_GET_BY_PK', (error, result) => {
                if (error) return reject(error);
                resolve(result.recordsets[0][0] || null);
            });
    });
}

async function ins(user) {
    const { user_id, password, first_name, last_name, email, role } = user;

    if (!user_id || !password) {
        return { status: 400, message: "User id and password is required" };
    }

    const users = await getUserById(user_id);
    if (users) {
        return { status: 400, message: "User id already exists" };
    }

    const hashedPassword = await utility.encrypt(password);
    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("USER_ID", mssql.VarChar, user_id)
            .input("PASSWORD", mssql.VarChar, hashedPassword)
            .input("FISRT_NAME", mssql.VarChar, first_name)
            .input("LAST_NAME", mssql.VarChar, last_name)
            .input("EMAIL", mssql.VarChar, email)
            .input("ROLE", mssql.VarChar, role)
            .input("LAST_LOGIN_DATE", mssql.DateTime, null)
            .input("PREVIOUS_LOGIN_DATE", mssql.DateTime, null)
            .input("CREATE_DATE", mssql.DateTime, currentDate)
            .input("CREATE_USER", mssql.VarChar, user_id)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_USER_INS', (error, result) => {
                if (error) return reject(error);
                const json = {
                    user_id: user_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    role: role
                };
                //resolve(json);
                resolve({ status: 201, data: json })
            });
    });
}

async function upd(user) {
    const { user_id, first_name, last_name, email, role } = user;
    const currentDate = await utility.getSystemDate();

    let pool = await mssql.connect(db_config);
    return new Promise((resolve, reject) => {
        pool.request()
            .input("USER_ID", mssql.VarChar, user_id)
            .input("FISRT_NAME", mssql.VarChar, first_name)
            .input("LAST_NAME", mssql.VarChar, last_name)
            .input("EMAIL", mssql.VarChar, email)
            .input("ROLE", mssql.VarChar, role)
            .input("UPDATE_DATE", mssql.DateTime, currentDate)
            .input("UPDATE_USER", mssql.VarChar, user_id)
            .execute('USP_USER_UPD', (error, result) => {
                if (error) return reject(error);
                const json = {
                    user_id: user_id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    role: role
                };
                resolve(json);
            });
    });
}

async function del(userId) {
    try {
        let pool = await mssql.connect(db_config);

        return new Promise((resolve, reject) => {
            pool.request()
                .input('USER_ID', mssql.VarChar, userId)
                .execute('USP_USER_DEL', (error, result) => {
                    if (error) return reject(error);
                    resolve({ status: 200, message: "Deleted successfully" });
                });
        });
    } catch (error) {
        return { status: 500, message: "Error occurred while retrieving data", error_message: error.message }
    }
}

async function changePassword(user) {
    const { user_id, old_password, new_password } = user;
    const currentDate = await utility.getSystemDate();

    const users = await user.getUserById(user_id);
    if (users && users.length > 0) {
        const user = users[0];
        const hashedPassword = user.password;
        const isPass = await utility.compare(old_password, hashedPassword);
        if (isPass) {
            let pool = await mssql.connect(db_config);
            return new Promise((resolve, reject) => {
                pool.request()
                    .input("USER_ID", mssql.VarChar, user_id)
                    .input("PASSWORD", mssql.VarChar, new_password)
                    .input("UPDATE_DATE", mssql.DateTime, currentDate)
                    .input("UPDATE_USER", mssql.VarChar, user_id)
                    .execute('USP_USER_CHANGE_PASSWORD', (error, result) => {
                        if (error) return reject(error);
                        resolve({ status: 200, message: "Changed password successfully" });
                    });
            });
        } else {
            res.status(401).json({ message: "Passwords do not match! Authentication failed." });
        }
    }
    else {
        res.status(404).json({ message: "Data not found" });
        return;
    }
}

module.exports = {
    getUser,
    getUserById,
    insert: ins,
    update: upd,
    delete: del,
    changePassword
}
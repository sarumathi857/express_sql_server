import db from "../Db/db.js";
const table = 'authuser';
class AuthUserModel{
    static async UserLoginModel(email){
        const sql=`SELECT * FROM ${table} WHERE email=?`
        const [row]=await db.execute(sql,[email]);
        return row[0];
    }
    static async UserSignupModel(name, email, password,role){
        const sql=`INSERT INTO  ${table} (name, email, password,role) VALUES(?, ?, ?,?)`
        const [insert]=await db.execute(sql,[name, email, password,role]);
        return insert.insertId;
    }
}
export default AuthUserModel;
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config();
const db= mysql.createPool({
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DB,
    port: process.env.SQL_PORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit:0
})
export const connectDB = async ()=>{
    try{
        const connection = await db.getConnection();
        console.log("database is connected");
        connection.release();
    } catch(error){
        console.error("connection is not establised",error);
        process.exit(1);
    }
}
export default db;
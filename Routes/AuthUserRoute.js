import express from "express"

const authUserRoutes = express.Router();
import {protect} from '../Middleware/protect.js'
import {isAdmin} from '../Middleware/admin.js'
import {userSignUp, authLogin} from '../Controller/authUserController .js'

const authUserRoute = express.Router();
authUserRoutes.post('/login',authLogin)
authUserRoutes.post('/signup',userSignUp)

authUserRoutes.get('/protected',protect,isAdmin,(req,res)=>{
    res.status(200).json({message:"You have accessed a protected route!",user:req.user});
})

export default authUserRoute;

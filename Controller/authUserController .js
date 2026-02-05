import { hashpassword, passwordcheck } from "../utils/hash.js";
import {createToken} from "../utils/token.js";
import AuthUserModel from "../Model/authusermodel.js"
export const userSignUp = async (req, res) => {

try {
    const { name, email, password, role } = req.body;
    const checkEmail = await AuthUserModel.UserLoginModel(email)
    if (checkEmail) {
        return res.status(400).json({ message: "invalid credentials" });
    }
    const newPass = await hashpassword(password);
    const createuser = await AuthUserModel.UserSignupModel(
       {
        name:name,
        email:email,
        password:newPass,
         role: role || "user"
       })
            res.status(201).json({ message: "User has been created", user:id });
} catch (error) {
    res.status(500).json({ error: "Internal server error" })
}
}
export const authLogin = async (req, res) => {
   try {

        const { email, password } = req.body;
        const user = await AuthUserModel.UserLoginModel(email);
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })

        } 
        const UserPassword = await passwordcheck(password, user.password);
        if (!UserPassword) {
            return res.status(400).json({ message: "Wrong password" })
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}
export const login = async (req, res) => {
    try{
        const{email,password}=req.body;
        const user = await AuthUserModel.UserLoginModel(email)
        if(!user){
            return res.status(400).json({error:"Invalid user"})
        }
        const checkPassword= await passwordcheck(password,user.password)
        if(!checkPassword){
            return res.status(400).json({message:"Invalid password"})
        }
        const token= createToken({id:user.id,role:user.role})
        res.status(200).json({message:"Login successful",token:token})
    } 
    catch(error){
        res.status(500).json({error:"Internal server error"})
}
}
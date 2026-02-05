import UserModel from "../Model/userModel.js";
//create user
export const createUserController = async (req, res) => {
   try {
         const {name, email, password } = req.body
         const response = await UserModel.createUserModel({name, email, password})
         res.status(201).json({ 
            message: "User created successfully", 
            userId: response 
      })
   
   }
   catch (err) {
        res.status(500).json({ error:err.message });
   }
}
//get all users
export const getAllUsersController = async( req,res )=>{
   try{
      const users= await UserModel.getAllusersModel();
      res.json(users);
   }catch(error) {
  res.status(500).json({ error: error.message });
   }
}

export const updateUserPasswordController = async (req, res) => {
   try {
      const { password } = req.body;
      const updatePassword = await UserModel.updateUserPasswordModel(req.params.id, { password });
      if (!updatePassword) {
         res.status(404).json({ message: "User not found" });
     }
     else {
      res.json({
         message: "password has been updated"
      })
     }
   } catch (error) {
      res.status(500).json({ error: error.message })
   }
}
export const deleteUserController=async(req,res)=>{
   try{
      const delte = await UserModel.deleteUserModel(req.params.id);
      if(!delte){
         res.json({message:"user not found"});

      }
      else{
         res.json({message:"user deleted successfully"});
      }

   }catch(error){
      res.status(500).json({ error: error.message })
   }
}
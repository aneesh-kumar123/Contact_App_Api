const User = require("../service/user")
admin1 = User.newAdmin("aneesh","kumar")


const getAllUsers = (req,res) => {
    
  try{
      const allUsers = User.getAllUser();
      if(!allUsers)
      {
        //  return res.status(404).json({ error: "No user found" });
        throw new Error("No user found");
      }

    res.status(200).json(allUsers);
  }
  catch(error){
    console.log(error)
      res.status(500).json({ error: "Something went wrong" });
    
  }
}

const getUserByID = (req,res) => {
  try{
    const{id} = req.params;
    if(!id)
    {
        throw new Error("user id not provided");
    }
    const userByID = admin1.getUserById(id);
    if(!userByID)
    {
        throw new Error("user not found");
    }
      res.status(200).json(userByID);

  }
  catch(error){
    console.log(error);
      res.status(500).json({error : "something went wrong"});
     
  }
}

const createNewUser = (req,res) => {
  try{
      const {firstName, lastName} = req.body;
      if(!firstName)
      {
        //   return res.status(400).json({error : "invalid first name"});
        throw new Error("invalid first name");

      }
      if(!lastName)
      {
        //   return res.status(400).json({error : "invalid last name"});
        throw new Error("invalid last name");
      }

      const newUser = admin1.newStaff(firstName,lastName);
      if(!newUser)
      {
        // return res.status(400).json({error:"could not create new user"});
        throw new Error("could not create new user");
      }
      res.status(200).json(newUser);
  }
  catch(error){
      res.status(500).json({error : "something went wrong"});
      console.log(error);
  }
}




const updateUser = (req,res) =>{
  try{
    //   const id = req.params.id;
    const {id} = req.params; //id is validating in service/user.js
  

    const { parameter, value } = req.body; //parameter is also validating in service/user
  



      const isUpdated =  User.updateUserById(id,parameter,value);
      if(!isUpdated)
      {
        throw new Error("could not update");
      }


    //   if(!isUpdated)
    //       throw res.status(400).json({error : "could not update"});

      res.status(200).json({message : "user with id ${id} has been updated"})

  }
  catch(error){
      res.status(500).json({error : "something went wrong"});
      console.log(error);
  }
}




const deleteUser = (req,res) => {
  try{
      // const id = req.params.id;
      const {id} = req.params; //validate is done on service/user.js
      const deleteStatus = User.deleteUserById(id);
      if(!deleteStatus)
      {
        throw new Error("could not get  deleted");
      }
      // if(!deleteStatus)
      //     return res.status(400).json({error:"could not delete the user"});
      res.status(200).json({message : `user with id ${id} has been deleted successfully`});
      
  }
  catch(error){
      res.status(500).json({error : "something went wrong"});
      console.log(error);
  }
}



module.exports = {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser};
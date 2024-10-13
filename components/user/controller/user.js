// const User = require("../service/user")
// admin1 = User.newAdmin("aneesh","kumar","dsf","safdf")
// User.createAdmin(userName,firstName,lastName,password);

const badRequest = require("../../../errors/badRequest.js");
const NotFoundError = require("../../../errors/notFoundError.js");
const Logger = require("../../../util/logger.js");
const User = require("../service/user.js");
const db = require('../../../models');
const { where } = require("sequelize");


const getAllUsers = async (req, res, next) => {

  try {
    Logger.info("getAllUser called")
    const allUsers = await User.getAllUser();
    if (!allUsers) {
      //  return res.status(404).json({ error: "No user found" });
      throw new NotFoundError("No user found");
    }
    console.log(JSON.stringify(allUsers, null, 2));
    Logger.info("getAllUser ended")

    res.status(200).json(allUsers);
  }
  catch (error) {
    // console.log(error)
    //   res.status(500).json({ error: "Something went wrong" });
    next(error)

  }
}

const getUserByID = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new badRequest("user id not provided");
    }
    // const admin = User.allAdmins[0]
    const userByID = await User.getUserById(id);
    if (!userByID) {
      throw new NotFoundError("user not found");
    }
    res.status(200).json(userByID);

  }
  catch (error) {
    // console.log(error);
    //   res.status(500).json({error : "something went wrong"});
    next(error)


  }
}

const createNewUser = async (req, res, next) => {
  try {
    Logger.info("createUser called")
    const { userName, firstName, lastName, password } = req.body;

    if (typeof userName != "string") {
      throw new badRequest("invalid userName..")
    }

    if (typeof firstName != "string") {
      throw new badRequest("invalid firstName ...")
    }

    if (typeof lastName != "string") {
      throw new badRequest("invalid lastName..")
    }

    // const admin = User.allAdmins[0];
    const admin= await db.users.findOne({where:{
      userName:'aneesh_kumar',isActive:true,isAdmin:true
    }})
    // console.log(admin)
    // console.log("we reached here")
    const newUser = await User.newStaff(userName, firstName, lastName, password,admin);
    

    if (!newUser) {
      // return res.status(400).json({error:"could not create new user"});
      throw new NotFoundError("could not create new user");
    }
    res.status(200).json(newUser);
  }
  catch (error) {
    // res.status(500).json({error : "something went wrong"});
    // console.log(error);
    next(error)
  }
}




const updateUser = async (req, res, next) => {
  try {
    //   const id = req.params.id;
    const { id } = req.params; //id is validating in service/user.js
    if (!id) {
      throw new badRequest("user id not provided");
    }

    const updateData = req.body;
    const isUpdated = await User.updateUserById(id,updateData);
    if (!isUpdated) {
      throw new NotFoundError("could not update");
    }

    res.status(200).json({ message: "user with id ${id} has been updated" })

  }
  catch (error) {
    next(error)
  }
}




const deleteUser = async (req, res,next) => {
  try {
    // const id = req.params.id;
    const { id } = req.params; //validate is done on service/user.js
    if (!id) {
      throw new badRequest("user id not provided");
    }
    const deleteStatus = await User.deleteUserById(id);
    if (!deleteStatus) {
      throw new NotFoundError("could not get  deleted");
    }
    // if(!deleteStatus)
    //     return res.status(400).json({error:"could not delete the user"});
    res.status(200).json({ message: `user with id ${id} has been deleted successfully` });

  }
  catch (error) {
    // res.status(500).json({ error: "something went wrong" });
    // console.log(error);
    next(error)
  }
}



module.exports = { getAllUsers, getUserByID, createNewUser, updateUser, deleteUser };
const express = require("express");
const contactRouter = require("../contact");
const {getAllUsers,getUserByID,createNewUser,updateUser,deleteUser} = require("./controller/user");
const {verifyAdmin,verifyStaff,verifyUserId}  = require('../../middlewares/authorization')
const userRouter = express.Router();

// get all users
userRouter.get("/",verifyAdmin,getAllUsers);

// get users by id ->
userRouter.get("/:id",verifyAdmin,getUserByID);

// create users ->
userRouter.post("/",verifyAdmin,createNewUser);

// update user ->
userRouter.put("/:id",verifyAdmin,updateUser);

//delete users ->
userRouter.delete("/:id",verifyAdmin,deleteUser);


userRouter.use("/:userID/contact",verifyStaff,verifyUserId,contactRouter);

module.exports = userRouter;
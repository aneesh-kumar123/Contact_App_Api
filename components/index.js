const express = require('express');
const userRouter =require('./user');
const router = express.Router();
const cookiePerser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user/service/user');
const { newPayload } = require('../middlewares/authorization')
const NotFoundError = require('../errors/notFoundError');
const badRequest = require('../errors/badRequest');
const Logger = require('../util/logger')


router.use(cookiePerser());

router.post("/createAdmin", async (req, res,next) => {
  try{
    Logger.info("Admin creation  started")
    let {userName,firstName,lastName,password} = req.body;

    if(typeof userName!='string')
    {
      throw new badRequest("username is not string")
    }
    if(typeof firstName!='string')
    {
      throw new badRequest("firstName is not string")
    }
    if(typeof lastName!='string')
    {
      throw new badRequest("lastName is not string")
    }
    if(typeof password!='string')
    {
      throw new badRequest("password is not string")
    }


    let user = await User.newAdmin(userName,firstName,lastName,password);
    Logger.info("Admin created successfully")
    
    res.status(201).json(user)

  }
  catch(error)
  {
    next(error);
  }
  
})


router.post("/login", async (req, res,next) => {
try{

  Logger.info("Login request received")
  let {userName,password} = req.body
  //validate username and password
  if(typeof userName!= 'string')
  {
    // throw new Error("username is not string")
    throw new badRequest("username is not string")
  }
  if(typeof password!= 'string')
  {
    throw new badRequest("password is not string")
  }
  //find user by username
  // let admin = User.allAdmins[0]
  const user =await User.findUserNameByUserName(userName);
  console.log(user)

  if(!user){
      throw new NotFoundError("user does not exist");
  }

  //compare password
  if(await bcrypt.compare(password , user.password)){
    let payload = newPayload(user.userId,user.isAdmin)
    console.log(payload)
    let token = payload.signPayload()  
    console.log(token)
    //send cookiepay
    res.cookie("auth", `Bearer ${token}`)
    //send into header
    res.set("auth", `Bearer ${token}`)

    Logger.info("login completed")


    res.status(200).send(token)
}else{
    res.status(403).json({
        message : "password incorrect"
    })
}


  
}
catch(error)
{
  res.status(500).json({message: error.message})
  next(error)
}
  
})





router.use("/user",userRouter);

module.exports = router;




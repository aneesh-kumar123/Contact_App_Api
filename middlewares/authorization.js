const jwt = require('jsonwebtoken')
const Logger = require('../util/logger')
const UnAuthorizedError = require('../errors/unAuthorizedError')
const secretKey = 'aneesh_kumar234567'

const verifyAdmin = (req,res,next) =>{
  try{
    Logger.info("verifying Admin started")
    //check cookie
    if(!req.cookies.auth && !req.header['auth'])
    {
      //  throw new Error("cookies not found")
      throw new UnAuthorizedError("Cookie Not Found")
    }
    // console.log("one")
    //check token
    const token = req.cookies.auth.split(' ')[2];
    // console.log(token)
    if(!token)
    {
      // throw new Error("token not found")
      throw new UnAuthorizedError("Token Not Found")
    }
    // console.log("two")

    // let payload = payload.verifyToken(token);
    let payload = Payload.verifyToken(token)

    console.log(payload);
    
    if (!payload.isAdmin) {
        // throw new Error("it is not admin")
        throw new UnAuthorizedError("It is not admin")

    }
    Logger.info("verifyAdmin ended")
    Logger.info("next called")
    next();
  }
  catch(error)
  {
    // res.status(401).json({message:"Unauthorized"})
    next(error)
  }

}


const verifyStaff = (req,res,next) =>{
  try{
    Logger.info("verifying Staff started")
    //check cookie
    if(!req.cookies.auth && !req.header['auth'])
    {
      //  throw new Error("cookies not found")
      throw new UnAuthorizedError("Cookie Not Found")
    }
    //check token
    const token = req.cookies.auth.split(' ')[2];
    if(!token)
    {
      // throw new Error("token not found")
      throw new UnAuthorizedError("Token Not Found")

    }

    let payload = Payload.verifyToken(token);
    req.user=payload.id;

    console.log(payload);

    if (payload.isAdmin) {
        // throw new Error("it is admin")
        throw new UnAuthorizedError("It is admin")
      
    }
    Logger.info("verifyStaff ended")
    Logger.info("next called")
    next();   
    
  }
  catch(error)
  {
    next(error)
  }
}


const verifyUserId =(req,res,next) => {
  try{
    Logger.info("verifyUserId started")
    const {userId} = req.params;
    const user = req.user;
    if(!userId)
    {
      // throw new Error("userId not found")
      throw new UnAuthorizedError("userId not found")
    }

    if(user != userId)
    {
      // throw new Error("userId not matched")
      throw new UnAuthorizedError("userId not matched")
    }
    Logger.info("verifyUserId ended")
    next();

    



  }
  catch(error)
  {
    next(error)
  }
}

const newPayload = (id, isAdmin) => {
  return Payload.newPayload(id, isAdmin);
};





class Payload {
  constructor(id , isAdmin) {
      this.id = id;
     
      this.isAdmin = isAdmin;
  }
  static newPayload(id , isAdmin) {
      try {
          return new Payload(id , isAdmin);
      } catch (error) {
          throw error;
      }
  }
  
  signPayload() {
     try {
      return `Bearer ${jwt.sign({
          id: this.id,
          isAdmin: this.isAdmin
      }, secretKey, {
          expiresIn: '10hr'
      })}`
     } catch (error) {
      console.log(error);
     }
  }

  static verifyToken(token) {
      //remove Bearer
      Logger.info("verification of token started")
      let payload = jwt.verify(token, secretKey)
      Logger.info("verification of token ended")
      return payload;

  }

}
module.exports = {newPayload , verifyAdmin , verifyStaff , verifyUserId }
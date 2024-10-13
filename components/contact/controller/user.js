const User = require('../../user/service/user');
const badRequest = require('../../../errors/badRequest')
const NotFoundError = require('../../../errors/notFoundError')
// const {Payload} = require('../../../middlewares/authorization')
const Logger = require('../../../util/logger');
const UnAuthorizedError = require('../../../errors/unAuthorizedError');


// admin = User.newAdmin("aneesh","kumar","sfd","asfsdf");
// const Contact = require('../service/user');

//create contact
const createNewContact = async (req,res,next) =>{
  try{
    Logger.info("contact creation started")
    const id = parseInt(req.params.userID);
    // console.log(id)
    if(isNaN(id))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    // console.log("id is ok")
    
    const token = req.cookies.auth.split(' ')[2];
    if(!token)
    {
      // throw new Error("token not found")
      throw new UnAuthorizedError("Token Not Found")

    }
    // console.log("token is ok")

    // let payload = Payload.verifyToken(token);
    // if(!payload)
    // {
    //   throw new UnAuthorizedError("Token is not valid")
    // }
    //  console.log(payload)

    // let payloadId = payload.id
    // if(payloadId != id)
    // {
    //   throw new UnAuthorizedError("id is not matching with staff")
    // }
    // console.log("payload is ok")

    const {firstName,lastName} = req.body;
    if(!firstName || !lastName)
    {
      throw new badRequest("firstName or lastName is not valid")
    }
    const admin = User.allAdmins[0];
    const user = admin.getStaffById(id);
    if(!user)
    {
      throw new NotFoundError("user not found")
    }
    console.log(user)
    const newContact = user.createContact(firstName,lastName)
    if(!newContact)
    {
      throw new NotFoundError("contact not found")
    }
    Logger.info("contact created successfully")
    res.status(200).json(newContact)
  }
  catch(error)
  {
    // res.status(500).json({error : "something went wrong"})
    // console.log(error)
    next(error)
  }
}

//get all contact
const getAllContact = async (req,res,next) =>{
  try{
    Logger.info("getting all contact started")
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    const admin = User.allAdmins[0];
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new NotFoundError("user not found")
    }
    const allContact = staffUser.getAllContact();
    if(!allContact)
    {
      throw new NotFoundError("contact not found")
    }
    Logger.info("getting all contact successfully")
    res.status(200).json(allContact)

    }
    catch(error)
    {
      // res.status(500).json({error : "something went wrong"})
      // console.log(error)
      next(error)
    }
    


}
//get contact by id
const getContactByID = async (req,res,next) =>{
  try{
    Logger.info("getting contact by id started")
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    const admin = User.allAdmins[0];
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new NotFoundError("user not found")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    const contact = staffUser.getContactById(userId);
    if(!contact)
    {
      throw new NotFoundError("contact not found")
    }
    Logger.info("getting contact by id successfully")
    res.status(200).json(contact)

    
  }
  catch(error)
  {
    // res.status(500).json({error : "something went wrong"})
    // console.log(error)
    next(error)
  }

 
}

//update contact by id
const updateContact = async (req,res) =>{
  try{
    Logger.info("updating contact by id started")
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }

    const { parameter,value } = req.body;
    if(!parameter)
    {
      throw new badRequest("parameter is required")
    }
    if(!value)
    {
      throw new badRequest("value is required")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    const admin = User.allAdmins[0];
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new NotFoundError("user not found")
    }



    const contact = staffUser.updateContactById(userId,parameter,value);
    if(!contact)
    {
      throw new NotFoundError("contact not updated")
    }
    Logger.info("updating contact by id ended")
    res.status(200).json(contact)
  }
  catch(error)
  {
    // res.status(500).json({error : "something went wrong"})
    // console.log(error)
    next(error)
  }

}

const deleteContact = async (req,res,next) =>{
  try{
    Logger.info("delete contacted by id started")
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }
    const admin = User.allAdmins[0];
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new NotFoundError("user not found")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new badRequest("id is not valid")
    }

    const contact = staffUser.deleteContactById(userId);
    if(!contact)
    {
      throw new NotFoundError("contact not deleted")
    }
    Logger.info("delete contacted by id ended")
    res.status(200).json(contact)
  }
  catch(error)
  {
    // res.status(500).json({error : "something went wrong"})
    // console.log(error)
    next(error)
  }

}


module.exports = {getAllContact,getContactByID,createNewContact,updateContact,deleteContact};




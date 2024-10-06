const User = require('../../user/service/user');
admin = User.newAdmin("aneesh","kumar");
// const Contact = require('../service/user');

//create contact
const createNewContact =(req,res) =>{
  try{
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }
    const {firstName,lastName} = req.body;
    if(!firstName || !lastName)
    {
      throw new Error("firstName or lastName is not valid")
    }
    const user = admin.getStaffById(id);
    if(!user)
    {
      throw new Error("user not found")
    }
    const newContact = user.createContact(firstName,lastName)
    if(!newContact)
    {
      throw new Error("contact not found")
    }
    res.status(200).json(newContact)
  }
  catch(error)
  {
    res.status(500).json({error : "something went wrong"})
    console.log(error)
  }
}

//get all contact
const getAllContact = (req,res) =>{
  try{
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new Error("user not found")
    }
    const allContact = staffUser.getAllContact();
    if(!allContact)
    {
      throw new Error("contact not found")
    }
    res.status(200).json(allContact)

    }
    catch(error)
    {
      res.status(500).json({error : "something went wrong"})
      console.log(error)
    }
    


}
//get contact by id
const getContactByID = (req,res) =>{
  try{
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }
   
    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new Error("user not found")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }
    const contact = staffUser.getContactById(userId);
    if(!contact)
    {
      throw new Error("contact not found")
    }
    res.status(200).json(contact)

    
  }
  catch(error)
  {
    res.status(500).json({error : "something went wrong"})
    console.log(error)
  }

 
}

//update contact by id
const updateContact = (req,res) =>{
  try{
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }

    const { parameter,value } = req.body;
    if(!parameter)
    {
      throw new Error("parameter is required")
    }
    if(!value)
    {
      throw new Error("value is required")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }

    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new Error("user not found")
    }



    const contact = staffUser.updateContactById(userId,parameter,value);
    if(!contact)
    {
      throw new Error("contact not updated")
    }
    res.status(200).json(contact)
  }
  catch(error)
  {
    res.status(500).json({error : "something went wrong"})
    console.log(error)
  }

}

const deleteContact = (req,res) =>{
  try{
    const id = parseInt(req.params.userID);
    if(isNaN(id))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }

    const staffUser = admin.getStaffById(id);
    if(!staffUser)
    {
      throw new Error("user not found")
    }

    const userId = parseInt(req.params.id);
    if(isNaN(userId))
    {
      // console.log(id)
      throw new Error("id is not valid")
    }

    const contact = staffUser.deleteContactById(userId);
    if(!contact)
    {
      throw new Error("contact not deleted")
    }
    res.status(200).json(contact)
  }
  catch(error)
  {
    res.status(500).json({error : "something went wrong"})
    console.log(error)
  }

}


module.exports = {getAllContact,getContactByID,createNewContact,updateContact,deleteContact};




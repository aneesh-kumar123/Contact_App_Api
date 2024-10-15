const User = require('../../user/service/user');
const badRequest = require('../../../errors/badRequest')
const notFoundError = require('../../../errors/notFoundError')
const unAuthorizedError = require('../../../errors/unAuthorizedError')
const Logger = require('../../../util/logger');
const db = require('../../../models');
const ContactDetail = require('../../contact_detail/service/user');
// admin = User.newAdmin("aneesh","kumar","okdsj","jhjkhlk");

//create newContactDeyail
const createNewContactDetail = async (req,res,next) =>{
  try{
    Logger.info("create contact Detail started")
    const userId = parseInt(req.params.userID);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }
     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }
     
     const {type,value}  = req.body;
     if(!type || !value)
     {
       throw new badRequest('type and value is required')
     }

     //checking userId in user table
     const user = await db.user.findByPk(userId);
     if(!user)
     {
       throw new notFoundError('user not found')
     }

     //checking contactId in contact table
     const contact = await db.contact.findByPk(contactId);
     if(!contact)
     {
       throw new notFoundError('contact not found')
     }

      const newContactDetail = await ContactDetail.createNewContactDetail(contact,type,value)
     


    //  const newContactDetail = staffUser.createContactDetail(contactId,type,value)
     if(!newContactDetail)
     {
       throw new notFoundError('contact detail not created')
     }
     Logger.info("create contact Detail ended")
     res.status(200).json({message:'contact detail created successfully',newContactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
    next(error)
    
  }

}

//getAllContactDetail

const getAllContactDetail = async (req,res,next) =>{
  try{
    Logger.info("get all contact Detail started")
    const userId = parseInt(req.params.userID);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }
     //checking userId in user table
     const user = await db.user.findByPk(userId);

     if(!user)
     {
       throw new notFoundError('user not found')
     }

     //checking contactId in contact table
     const contact = await db.contact.findByPk(contactId);

     if(!contact)
     {
       throw new notFoundError('contact not found')
     }

     //checking contactId in contactDetail table
     const contactDetail = await ContactDetail.getAllContactDetail(contact)
     
     if(!contactDetail)
     {
       throw new notFoundError('contact detail not found')
     }
     Logger.info("contact detail fetch successfully")
     res.status(200).json({message:'contact detail found successfully',contactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
    next(error)
  }
  
}

//getContactDetailById

const getContactDetailById = async (req,res,next) =>{
  try{
    Logger.info("get contact Detail by id started")
    const userId = parseInt(req.params.userID);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }

    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }

    //check userId in user table
    const user = await db.user.findByPk(userId);
    if(!user)
    {
      throw new notFoundError('user not found')
    }

    //check contactId in contact table
    const contact = await db.contact.findByPk(contactId);
    if(!contact)
    {
      throw new notFoundError('contact not found')
    }

    //check detailId in contactDetail table
    const contactDetail = await ContactDetail.getContactDetailById(contact,id)
     
     if(!contactDetail)
     {
       throw new notFoundError('contact detail not found')
     }
     Logger.info("get contact Detail by id ended")
     res.status(200).json({message:'contact detail found successfully',contactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
    next(error)
  }
  
}

//updateContactDetailById

const updateContactDetailById = async (req,res,next) =>{
  try{
    Logger.info("update contact Detail by id started")
    const userId = parseInt(req.params.userID);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }
    //  console.log("ok1")
    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }

     const {type,value} = req.body;
     if(!type || !value)
     {
       throw new badRequest('type and value are required')
     }

    //  console.log("ok2")

     //checking userId from user table
     const user = await db.user.findByPk(userId)

     if(!user)
     {
       throw new notFoundError('user not found')
     }

     console.log("ok3")

     //checking contactId from contact table
     const contact = await db.contact.findByPk(contactId)

     if(!contact)
     {
       throw new notFoundError('contact not found')
     }

     console.log("ok4")

     //checking id from contact_detail table
     const updatedDetail = await ContactDetail.updateContactDetailById(contact,id,type,value)
     if(!updatedDetail)
     {
       throw new notFoundError('contact detail not found')
     }
     Logger.info("contact Detail updated successfully")

     res.status(200).json({message:'contact detail updated successfully',updatedDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
    next(error)
  }


}


//deleteContactDetailById

const deleteContactDetail = async (req,res,next) =>{
  try{
    Logger.info("deleted contact Detail started")
     const userId = parseInt(req.params.userID);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }
     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }
    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }
    //check userId from user table
    const user = await db.user.findByPk(userId)
    if(!user)
    {
      throw new notFoundError('user not found')
    }
    //check contactId from contact table
    const contact = await db.contact.findByPk(contactId)
    if(!contact)
    {
      throw new notFoundError('contact not found')
    }
    //check id from contact_detail table
    const deletedDetail = await ContactDetail.deleteContactDetailById(contact,id)
    
     if(!deletedDetail)
     {
       throw new notFoundError('contact detail not found')
     }
     Logger.info("deleted contact Detail ended")
     res.status(200).json({message:'contact detail deleted successfully',deletedDetail})
     }
  catch(error)
  {
    res.status(500).json({message:error.message});
    next(error)
  }
}



module.exports = {getAllContactDetail,getContactDetailById,createNewContactDetail,updateContactDetailById,deleteContactDetail};



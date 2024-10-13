const User = require('../../user/service/user');
const badRequest = require('../../../errors/badRequest')
const notFoundError = require('../../../errors/notFoundError')
const unAuthorizedError = require('../../../errors/unAuthorizedError')
const Logger = require('../../../util/logger');
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
     const admin = User.allAdmins[0];
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new notFoundError('user not found')
     }

     const {type,value}  = req.body;
     if(!type || !value)
     {
       throw new badRequest('type and value is required')
     }

     const newContactDetail = staffUser.createContactDetail(contactId,type,value)
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
     const admin = User.allAdmins[0];
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new notFoundError('user not found')
     }
     const contactDetail = staffUser.getAllContactDetailsByContactID(contactId)
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

    //  const id = parseInt(req.params.id);
    //  if(isNaN(id))
    //  {
    //    throw new badRequest('id is not valid')
    //  }

    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }
     const admin = User.allAdmins[0];
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new notFoundError('user not found')
     }
     const contactDetail = staffUser.getContactDetailByID(contactId,id)
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
    //  const id = parseInt(req.params.id);
    //  if(isNaN(id))
    //  {
    //    throw new badRequest('id is not valid')
    //  }
    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }

     const {type,value} = req.body;
     if(!type || !value)
     {
       throw new badRequest('type and value are required')
     }

     const admin = User.allAdmins[0];
     
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new notFoundError('user not found')
     }

     const updatedDetail = staffUser.updateContactDetailByID(contactId,id,type,value)
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
     const userId = parseInt(req.params.userId);
     if(isNaN(userId))
     {
       throw new badRequest('userId is not valid')
     }
     const contactId = parseInt(req.params.contactId);
     if(isNaN(contactId))
     {
       throw new badRequest('contactId is not valid')
     }
    //  const id = parseInt(req.params.id);
    //  if(isNaN(id))
    //  {
    //    throw new badRequest('id is not valid')
    //  }

    const id = parseInt(req.params.Id);
    if (id<0) {
      throw new badRequest("user id not provided");
    }
     const admin = User.allAdmins[0];
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new notFoundError('user not found')
     }

     const deletedDetail = staffUser.deleteContactDetailByID(contactId,id)
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



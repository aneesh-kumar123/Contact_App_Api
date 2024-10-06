const User = require('../../user/service/user');
admin = User.newAdmin("aneesh","kumar");

//create newContactDeyail
const createNewContactDetail = (req,res) =>{
  try{
    const userId = parseInt(req.params.userID);
     if(NaN(userId))
     {
       throw new Error('userId is not valid')
     }
     const contactId = parseInt(req.params.contactId);
     if(NaN(contactId))
     {
       throw new Error('contactId is not valid')
     }

     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new Error('user not found')
     }

     const {type,value}  = req.body;
     if(!type || !value)
     {
       throw new Error('type and value is required')
     }

     const newContactDetail = staffUser.createContactDetail(contactId,type,value)
     if(!newContactDetail)
     {
       throw new Error('contact detail not created')
     }
     res.status(200).json({message:'contact detail created successfully',newContactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
    
  }

}

//getAllContactDetail

const getAllContactDetail = (req,res) =>{
  try{
    const userId = parseInt(req.params.userID);
     if(NaN(userId))
     {
       throw new Error('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(NaN(contactId))
     {
       throw new Error('contactId is not valid')
     }
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new Error('user not found')
     }
     const contactDetail = staffUser.getAllContactDetailsByContactID(contactId)
     if(!contactDetail)
     {
       throw new Error('contact detail not found')
     }
     res.status(200).json({message:'contact detail found successfully',contactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
  
}

//getContactDetailById

const getContactDetailById = (req,res) =>{
  try{
    const userId = parseInt(req.params.userID);
     if(NaN(userId))
     {
       throw new Error('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(NaN(contactId))
     {
       throw new Error('contactId is not valid')
     }

     const id = parseInt(req.params.id);
     if(NaN(id))
     {
       throw new Error('id is not valid')
     }
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new Error('user not found')
     }
     const contactDetail = staffUser.getContactDetailByID(contactId,id)
     if(!contactDetail)
     {
       throw new Error('contact detail not found')
     }
     res.status(200).json({message:'contact detail found successfully',contactDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
  
}

//updateContactDetailById

const updateContactDetailById = (req,res) =>{
  try{
    const userId = parseInt(req.params.userID);
     if(NaN(userId))
     {
       throw new Error('userId is not valid')
     }

     const contactId = parseInt(req.params.contactId);
     if(NaN(contactId))
     {
       throw new Error('contactId is not valid')
     }
     const id = parseInt(req.params.id);
     if(NaN(id))
     {
       throw new Error('id is not valid')
     }

     const {type,value} = req.body;
     if(!type || !value)
     {
       throw new Error('type and value are required')
     }
     
     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new Error('user not found')
     }

     const updatedDetail = staffUser.updateContactDetailByID(contactId,id,type,value)
     if(!updatedDetail)
     {
       throw new Error('contact detail not found')
     }
     res.status(200).json({message:'contact detail updated successfully',updatedDetail})
  }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }


}


//deleteContactDetailById

const deleteContactDetail = (req,res) =>{
  try{
     const userId = parseInt(req.params.userId);
     if(NaN(userId))
     {
       throw new Error('userId is not valid')
     }
     const contactId = parseInt(req.params.contactId);
     if(NaN(contactId))
     {
       throw new Error('contactId is not valid')
     }
     const id = parseInt(req.params.id);
     if(NaN(id))
     {
       throw new Error('id is not valid')
     }

     const staffUser = admin.getStaffById(userId)
     if(!staffUser)
     {
       throw new Error('user not found')
     }

     const deletedDetail = staffUser.deleteContactDetailByID(contactId,id)
     if(!deletedDetail)
     {
       throw new Error('contact detail not found')
     }
     res.status(200).json({message:'contact detail deleted successfully',deletedDetail})
     }
  catch(error)
  {
    res.status(500).json({message:error.message});
  }
}



module.exports = {getAllContactDetail,getContactDetailById,createNewContactDetail,updateContactDetailById,deleteContactDetail};



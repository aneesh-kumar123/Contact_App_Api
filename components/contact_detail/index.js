const express = require('express')
const {getAllContactDetail,getContactDetailById,createNewContactDetail,updateContactDetailById,deleteContactDetail} = require("./controller/user");
const contactDetailRouter = express.Router({ mergeParams: true });

contactDetailRouter.get('/',getAllContactDetail);
contactDetailRouter.get('/:Id',getContactDetailById);
contactDetailRouter.post('/',createNewContactDetail);
contactDetailRouter.put('/:Id',updateContactDetailById);
contactDetailRouter.delete('/:Id',deleteContactDetail);

module.exports = contactDetailRouter;



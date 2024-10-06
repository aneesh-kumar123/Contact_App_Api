const express = require('express')
const contactDetailRouter = require('../contact_detail')
const {getAllContact,getContactByID,createNewContact,updateContact,deleteContact} = require("./controller/user");
const contactRouter = express.Router({ mergeParams: true });

// const user = require("../user/service/user.js");


contactRouter.get('/',getAllContact);

contactRouter.get('/:id',getContactByID);

contactRouter.post('/',createNewContact);

contactRouter.put('/:id',updateContact);

contactRouter.delete('/:id',deleteContact);

contactRouter.use('/:contactId/contactDetail',contactDetailRouter);
module.exports = contactRouter;













module.exports = contactRouter;

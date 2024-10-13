
const Contact = require('../../contact/service/user.js');
const ContactDetail = require('../../contact_detail/service/user.js');
const bcrypt = require('bcrypt')
const db = require('../../../models');
const { ValidationErrorItemOrigin } = require('sequelize');

class User {

  static #allusers = []
  static allAdmins = [];
  static #allStaffs = [];
  static userId = 0
  constructor(firstName, lastName,userName,password,isAdmin) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.isAdmin = isAdmin;
    this.isActive = true;
    this.contact = [];
    this.userId = User.userId++;
    this.userName = userName;
    this.password = password
  }

  static async newAdmin(userName,firstName, lastName,password) {
    //now perform try catch 
    try {
      // now validate firstName and lastName
      if(typeof userName != 'string')
      {
        throw  new Error('userName is not string')
      }
      if (typeof firstName != "string") {
        throw new Error("firstName should be string")
      }
      if (typeof lastName != "string") {
        throw new Error("lastName should be string")
      }
      if (firstName == lastName) {
        throw new Error("firstName and lastName should not be same")
      }
      // now create new user
      const hashedPassword = await bcrypt.hash(password , 10);

      const existingUser = await db.users.findOne({
        where: { userName }
      });
  
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists." });
      }

      // let newAdmin = new User(firstName, lastName,userName,hashedPassword,)
      const newAdmin= await db.users.create({firstName, lastName,userName,password: hashedPassword, isAdmin: true, isActive: true});
      // console.log("dbResponses>>>",newAdmin)
      //now add to allusers
      // User.allAdmins.push(newAdmin);
      // User.#allusers.push(newAdmin)
      return newAdmin;
    }
    catch (error) {
      console.log(error)
      throw error

    }
  }

 static async newStaff(userName,firstName, lastName,password,admin) {
    try {
      console.log("newStaff is called")
      
      if (!admin.isAdmin) {
        throw new Error("only admin can create new staff")
      }

      if (firstName == lastName) {
        throw new Error("firstName and lastName should not be same")
      }
      const hashedPassword = await bcrypt.hash(password , 10);
      const existingUser = await db.users.findOne({
        where: { userName }
      });
  
      if (existingUser) {
        // return res.status(400).json({ message: "UserName already exists." });
        throw new Error("UserName already exists.")
      }
     
      // let newStaff = new User(firstName, lastName, false,userName,hashedPassword)
      let newStaff = await db.users.create({firstName, lastName,userName,password: hashedPassword, isAdmin: false, isActive: true})
      // User.#allStaffs.push(newStaff);
  
      // User.#allusers.push(newStaff)

      return newStaff
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

 static async findUserNameByUserName(userName)
  {
    try {
      if (typeof userName != "string") {
        throw new Error("userName should be string")
      }
      // let user = User.#allusers.find((user) => user.userName == userName  && user.isActive)
      let user = await db.users.findOne({where:{
        userName,isActive:true
      }});
      // findOne({ where: { userName, isActive: true } });
      if (!user) {
        throw new Error("user not found")
      }
      return user
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  // getIsAdmin() {
  //   return this.isAdmin;
  // }

  // getIsActive() {
  //   return this.isActive;
  // }

  // check isadmin
   isAdmin(user) {
    return user.isAdmin && user.isActive
  }
  // check isstaff
   isStaff(user) {
    return user.isAdmin == false && user.isActive
  }
  static getAllStaffs() {
    let allStaffs = User.#allStaffs;
  let staffList = [];
  for (let staff of allStaffs) {
    if (staff.isActive) {
      staffList.push(staff);
    }
  }
  return staffList;
  }
  //get all user considering only active user come
  static async getAllUser() {
    // return User.#allusers.filter(user => user.isActive)
    try {
      console.log("Fetching all users now...");
      let users = await db.users.findAll();
      console.log("Fetched users:");
      // console.log(JSON.stringify(users, null, 2));
      return users;
  } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
  }
  }

  //getuserbyId
 static async getUserById(userId) {
    try {
      console.log(userId)
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }
      // let user = User.#allusers.find(user => user.userId == userId)
      let user = await db.users.findByPk(userId);
      if (!user) {
        throw new Error("user not found")
      }
      return user


    }
    catch (error) {
      console.log(error)
    }
  }


  getStaffById(staffID) {
    try {
      
      if (this.isAdmin == false) {
        throw new Error("only staff can fetch all detail")

      }

      let staff = User.#allStaffs.find(staff => staff.userId == staffID)
      if(!staff)
      {
        throw new Error("staff not found")

      }
      return staff;

    } catch (error) {
      console.log(error);
    }
  }
 
  updateFirstName(value) {
    try {
      if (typeof value != "string") {
        throw new Error("firstName is not string")
      }
      this.firstName = value


    }
    catch (error) {
      console.log(error)
    }

  }
  updateLastName(value) {
    try {
      if (typeof value != "string") {
        throw new Error("lastName is not string")
      }
      this.lastName = value


    }
    catch (error) {
      console.log(error)
    }
  }
  updateIsActive(value) {
    try {
      if (typeof value != "boolean") {
        throw new Error("isActive is not boolean")
      }
      this.isActive = value


    }
    catch (error) {
      console.log(error)
    }
  }

  //now updateuser
  static async updateUserById(userId, updateData) {
    try {
      //validate userid and parameter
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }

      if (typeof updateData != "object") {
        throw new Error("updateData is not object")
      }

      let user = await db.users.update(updateData, {
        where: { id: userId }
    });
    console.log("Updated user:");
    console.log(JSON.stringify(user, null, 2));
    return user;

    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  //now delete user by admin only
  static async deleteUserById(userId) {
    try {
      //validate userid
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }
      // let foundOfUser = User.getUserById(userId)
      //just inactive the user
      const deleted = await db.users.destroy({
        where: { id: userId}
      })
     
      console.log("the userid", userId, "deleted successfully")
      // foundOfUser.updateIsActive(false)
      return true;

    }
    catch (error) {
      console.log(error)
      throw error
    }

  }
  //staff operation on contact and contactDetail

  getAllContact() {
    try {
      if (this.isAdmin == true) {
        throw new Error("only staff can fetch all detail")

      }
      // return Contact.getAllContact()
      return this.contact.filter(contact => contact.isActive)
    }
    catch (error) {
      console.log(error)
    }
  }

  getContactById(contId) {
    try {
      if (this.isAdmin == true) {
        throw new Error("only staff can fetch detail  by id")

      }
      // return Contact.getContactById(contId)
      return this.contact.find(contact => contact.contactId == contId && contact.isActive);
    }
    catch (error) {
      console.log(error)
    }
  }
  createContact(firstName, lastName) {
    try {
      //only staff can create contact
      if (this.isAdmin == true) {
        throw new Error("only staff can create contact")

      }
      if (typeof firstName != "string" || typeof lastName != "string") {
        throw new Error("firstName or lastName is not string")
      }
      let newContact = Contact.createContact(firstName, lastName)
      this.contact.push(newContact)
      console.log("contact created successfully")
      return newContact

    }
    catch (error) {
      console.log(error)
    }

  }

  updateContactById(contId, parameter, value) {
    try {
      if (this.isAdmin == true) {
        throw new Error("only staff can update contact")

      }
      let contactObj=this.getContactById(contId)
      contactObj.updateContactById(parameter,value)
      return true;
      // Contact.updateContactById(contId, parameter, value)

    }
    catch (error) {
      console.log(error)
    }
  }

  deleteContactById(contId) {
    try {
      // if (this.isAdmin == true) {
      //   throw new Error("only staff can delete contact")

      // }
      let contactObj=this.getContactById(contId)
      contactObj.deleteContactById();
      return true;


      // Contact.deleteContactById(contId)

    }
    catch (error) {
      console.log(error)
    }
  }

  //now staff operation on contactDetail
  createContactDetail(contId, type, value) {
    try {
      if (this.isAdmin == true) {
        throw new Error("only staff can create contactDetail")
      }
      let contact = this.getContactById(contId)
      if (!contact) {
        throw new Error("Contact not found for this contact detail.");
      }
      contact.addDetail(type, value)
      return true;
    }
    catch (error) {
      console.log(error)
    }

  }

  getContactDetailByID(contactID, detailID) {
    try {
      const contact = this.getContactById(contactID);
      return contact.getContactDetailById(detailID);
    } catch (error) {
      console.log(error);
    }
  }

  getAllContactDetailsByContactID(contactID){
    try{
      const contact = this.getContactById(contactID);
      return contact.getAllContactDetails();
    }
    catch(error){
      console.log(error);
    }
  }

  updateContactDetailByID(contactID, detailID, propertyName, newValue) {
    try {
      const contact = this.getContactById(contactID);
      contact.updateDetailByID(detailID, propertyName, newValue);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  deleteContactDetailByID(contactID, detailID) {
    try {
      const contact = this.getContactById(contactID);
      contact.deleteDetailByID(detailID);
      console.log("contact deleted successfully")
      return true;
    } catch (error) {
      console.log(error);
    }
  }

}

module.exports = User;
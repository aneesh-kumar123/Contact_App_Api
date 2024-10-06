
const Contact = require('../../contact/service/user.js');
const ContactDetail = require('../../contact_detail/service/user.js');

class User {

  static #allusers = []
  static #allAdmins = [];
  static #allStaffs = [];
  static userId = 0
  constructor(firstName, lastNmae, isAdmin) {
    this.firstName = firstName;
    this.lastName = lastNmae;
    this.isAdmin = isAdmin;
    this.isActive = true;
    this.contact = [];
    this.userId = User.userId++;
  }

  static newAdmin(firstName, lastName) {
    //now perform try catch 
    try {
      //now validate firstname and lastname
      if (typeof firstName != "string") {
        throw new Error("firstname should be string")
      }
      if (typeof lastName != "string") {
        throw new Error("lastname should be string")
      }
      if (firstName == lastName) {
        throw new Error("firstname and lastname should not be same")
      }
      //now create new user
      let newAdmin = new User(firstName, lastName, true)
      //now add to allusers
      User.#allAdmins.push(newAdmin);
      User.#allusers.push(newAdmin)
      return newAdmin
    }
    catch (error) {
      console.log(error)

    }
  }

  newStaff(firstName, lastName) {
    try {
      
      if (this.isAdmin == false) {
        throw new Error("only admin can create new staff")
      }
      
      if (typeof firstName != "string") {
        throw new Error("firstname should be string")
      }
      if (typeof lastName != "string") {
        throw new Error("lastname should be string")
      }

      if (firstName == lastName) {
        throw new Error("firstname and lastname should not be same")
      }
     
      let newStaff = new User(firstName, lastName, false)
      User.#allStaffs.push(newStaff);
  
      User.#allusers.push(newStaff)

      return newStaff
    }
    catch (error) {
      console.log(error)
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
  static getAllUser() {
    return User.#allusers.filter(user => user.isActive)
  }

  //getuserbyId
   getUserById(userId) {
    try {
      console.log(userId)
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }
      let user = User.#allusers.find(user => user.userId == userId)
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
        throw new Error("firstname is not string")
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
        throw new Error("lastname is not string")
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
  static updateUserById(userId, parameter, value) {
    try {
      //validate userid and parameter
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }
      if (typeof parameter != "string") {
        throw new Error("parameter is not string")
      }

      let foundOfUser = User.getUserById(userId)
      if (foundOfUser == null) {
        throw new Error("user not found")
      }
      //swtch case
      switch (parameter) {
        case "firstName":
          foundOfUser.updateFirstName(value)
          break;
        case "lastName":
          foundOfUser.updateLastName(value)
          break;
        case "isActive":
          foundOfUser.updateIsActive(value)
          break;
        default:
          throw new Error("parameter is not valid")

      }
      return foundOfUser

    }
    catch (error) {
      console.log(error)
    }
  }

  //now delete user by admin only
  static deleteUserById(userId) {
    try {
      //validate userid
      if (isNaN(Number(userId))) {
        throw new Error("userid is not number")
      }
      if (userId < 0) {
        throw new Error("userid should be positive")
      }
      let foundOfUser = User.getUserById(userId)
      //just inactive the user
     
      console.log("the userid", userId, "deleted successfully")
      foundOfUser.updateIsActive(false)
      return true;

    }
    catch (error) {
      console.log(error)
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
      return contact.getDetailByID(detailID);
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
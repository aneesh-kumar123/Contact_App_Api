const ContactDetail = require('../../contact_detail/service/user.js');
const db = require('../../../models')
class Contact {
  static contactId = 0
  // constructor(firstName, lastName) {
  //   this.firstName = firstName;
  //   this.lastName = lastName;
  //   this.isActive = true;
  //   this.contactDetail = [];
  //   this.contactId = Contact.contactId++;
  // }
  
  static async createContact(firstName, lastName,userId) {
    try {
      if (firstName == "" || lastName == "") {
        throw new Error("firstName and lastName should not be empty");
      }
      if (firstName == lastName) {
        throw new Error("firstName and lastName should not be same");
      }
      if(userId < 0)
      {
        throw new Error("userId should not be negative");
      }
      // let contact = new Contact(firstName, lastName);
      const contact = await db.contact.create({firstName,lastName,userId})
      // Contact.#allcontact.push(contact);
      return contact

    }
    catch (error) {
      console.log(error)
      throw error
    }

  }


  static async getAllContact(staff)
  {
    try {
     if(!staff)
     {
      throw new Error("staff should not be empty");
     }
      const contact = await db.contact.findAll(
        {
          where:{userId:staff.id},
          include: [{ model: db.contactDetail }]
      }
      )
      return contact
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getContactById(staff,id)
  {
    try {
      if(!staff)
      {
        throw new Error("staff should not be empty");
      }
      if(id<0)
      {
        throw new Error("id should not be negative");
      }
      const contact = await db.contact.findOne(
        {
          where:{id,userId:staff.id},
          include: [{ model: db.contactDetail }]
        })
      return contact
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  static async updateContactById(userId,contactId,parameter,value)
  {
    try {
      if(userId<0 || contactId<0)
      {
        throw new Error("id should not be negative");
      }
      const contact = await db.contact.update({[parameter]:value},{where:{id:contactId,userId:userId}})
      if(contact<=0)
      {
        throw new Error("check parameter");
      }
      return contact
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }

  static async deleteContactById(userId,contactId)
  {
    try {
      if(userId<0 || contactId<0)
      {
        throw new Error("id should not be negative");
      }
      const contact = await db.contact.destroy({where:{id:contactId,userId:userId}})
      if(contact<=0)
      {
        throw new Error("check parameter");
      }
      return contact
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }
  



  // getContactDetailById(contactDetailId)
  // {
  //   try {
  //     if (typeof contactDetailId != "number") {
  //       throw new Error("contactDetailId is not number")
  //     }
  //     if(contactDetailId<0 || this.contactDetail.length<contactDetailId)
  //     {
  //       throw new Error("contactDetailId is not valid")

  //     }
  //     //by filter find object
  //     for(let i=0;i<this.contactDetail.length;i++)
  //     {
  //      let tempContactDetail=this.contactDetail[i]
  //      if(tempContactDetail.contactDetailId==contactDetailId)
  //      {
  //       return tempContactDetail
  //      }
  //     }
  //     throw new Error("id does not exit")
  //   }
  //   catch(error)
  //   {
  //     console.log(error)
  //   }
  // }

  // getAllContactDetails()
  // {
  //   // return this.contactDetail which is active also
  //   return this.contactDetail.filter(contactDetail=>contactDetail.isActive)

  // }
  // updateFirstName(value) {
  //   try {
  //     if (typeof value != "string") {
  //       throw new Error("firstName is not string")
  //     }
  //     this.firstName = value


  //   }
  //   catch (error) {
  //     console.log(error)
  //   }

  // }
  // updateLastName(value) {
  //   try {
  //     if (typeof value != "string") {
  //       throw new Error("lastName is not string")
  //     }
  //     this.lastName = value


  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }
  // updateIsActive(value) {
  //   try {
  //     if (typeof value != "boolean") {
  //       throw new Error("isActive is not boolean")
  //     }
  //     this.isActive = value


  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }
  //  updateContactById(parameter, value) {
  //   try {
  //     //VALIDATION
     
  //     if (typeof parameter != "string") {
  //       throw new Error("parameter should be string")
  //     }
    
  //     switch (parameter) {
  //       case "firstName":
  //         this.updateFirstName(value)
  //         break;
  //       case "lastName":
  //         this.updateLastName(value)
  //         break;
  //       case "isActive":
  //         this.updateIsActive(value)
  //         break;
  //       default:
  //         throw new Error("parameter not found")

  //     }

  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }
  // deleteContactById() {
  //  this.isActive=false
  // }


  // addDetail(type,value)
  // {
  //   try {
  //     const contactId = this.contactDetail.length
  //     const newDetail = ContactDetail.createContactDetail(contactId,type,value)
  //     this.contactDetail.push(newDetail)
  // }
  // catch(error)
  // {
  //   console.log(error)
  // }
  // }

  // //getdetailByid
  // getDetailById(id)
  // {
  //   try {
  //     const detail = this.contactDetail.find(detail => detail.contactId == id)
  //     if (!detail) {
  //       throw new Error("detail not found")
        
  //     }
  //     return detail
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }

  // updateDetailById(id, parameter, value) {
  //   try {
  //     const detail = this.getDetailById(id)
  //     if (!detail) {
  //       throw new Error("detail not found")
  //     }
  //     detail.updateContactDetail(parameter, value)
  //     return true;
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }


  // //delete detailById
  // deleteDetailById(id) {
  //   try {
  //     const detail = this.getDetailById(id)
  //     if (!detail) {
  //       throw new Error("detail not found")
  //     }
  //     detail.deleteContactDetail()
  //     return true;
  //   }
  //   catch (error) {
  //     console.log(error)
  //   }
  // }












}

module.exports = Contact;
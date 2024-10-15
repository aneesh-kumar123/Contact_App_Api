const db = require('../../../models')
class ContactDetail {
  // static #allcontactDetail = []
  // static contactDetailId = 0

  // constructor(contactId, type, value) {
  //   this.contactId = contactId
  //   this.type = type
  //   this.value = value
  //   this.isActive = true
  //   this.contactDetailId = ContactDetail.contactDetailId++

  // }


  static async createNewContactDetail(contact, type, value) {
    try {
      
      // if (typeof contactId != "number") {
      //   throw new Error("contactId should be number")
      // }
      if (typeof type != "string") {
        throw new Error("type should be string")
      }
      if (type != "phone" && type != "email") {
        throw new Error("Invalid type")
      }


      const newContactDetail = await db.contactDetail.create({
        type: type,
        value: value,
        contactId:contact.id
        
      })



      return newContactDetail
    }
    catch (error) {
      console.log(error)
    }

  }

  static async getAllContactDetail(contact)
  {
    try {
      const contactDetail = await db.contactDetail.findAll({
        where: {
          contactId: contact.id
        }
      })
      return contactDetail
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  static async getContactDetailById(contact,id)
  {
    try {
      const contactDetail = await db.contactDetail.findOne({
        where: {
          contactId: contact.id,
          id:id
        }
      })
      return contactDetail
    }
    catch (error) {
      console.log(error)
      throw error
    }
  }

  static async updateContactDetailById(contact,id,type,value)
  {
    try {

     
        if (type != "phone" && type != "email") {
          throw new Error("Invalid type")
        }
      
      const contactDetail = await db.contactDetail.update({
        type: type,
        value: value,
      },
        {
          where: {
            contactId: contact.id,
            id:id


          }
        })

        if(contactDetail<=0)
        {
          throw new Error("check type or value")
        }
      return contactDetail
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }

  static async deleteContactDetailById(contact,id)
  {
    try {
      const contactDetail = await db.contactDetail.destroy({
        where: {
          contactId: contact.id,
          id:id
        }
      })
      return contactDetail
    }
    catch (error) {
      console.log(error)
      throw error
    }

  }



}

module.exports = ContactDetail;
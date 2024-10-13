
class ContactDetail {
  // static #allcontactDetail = []
  static contactDetailId = 0

  constructor(contactId, type, value) {
    this.contactId = contactId
    this.type = type
    this.value = value
    this.isActive = true
    this.contactDetailId = ContactDetail.contactDetailId++

  }


  static createContactDetail(contactId, type, value) {
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
      // if (type === "phone") {
      //   ContactDetail.validatePhone(value)
      // }
      // if (type === "email") {
      //   ContactDetail.validateEmail(value)
      // }

      let newContactDetail = new ContactDetail(contactId, type, value)
      if (newContactDetail == undefined) {
        throw new Error("Invalid contact detail")
      }
      // ContactDetail.#allcontactDetail.push(newContactDetail)
      return newContactDetail
    }
    catch (error) {
      console.log(error)
    }

  }



  updateContactDetail(propertyName, newValue) {
    try {
      switch (propertyName) {
        case "type":
          this.type = newValue;
          break;
        case "value":
          this.value = newValue;
          break;
        default:
          throw new Error("Invalid property name.");
      }
    } catch (error) {
      console.log(error);
    }
  }

   deleteContactDetail() {
    this.isActive=false

    
  }
}

module.exports = ContactDetail;
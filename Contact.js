const ContactInfo = require("./ContactInfo")

class Contact {
    static id = 0
    constructor(name) {
        this.name = name
        this.contactInfo = []
        this.id = Contact.id++
    }
    static newContact(name) {
        if (typeof name != "string") {
            throw new Error("Invalid name")
        }
        return new Contact(name)
    }
    updateContact(parameter,newValue) {
        switch (parameter) {
            case "name":
                this.name = this.#updateName(newValue)
                break;

            default:
                break;
        }
    }

    #updateName(newValue) {
        if (typeof newValue != "string") {
            throw new Error("Invalid Name")
        }
        this.name = newValue
    }
    createContactInfo(typeOfContactInfo, valueOfContactInfo) {
        let newContactInfo = ContactInfo.newContactInfo(typeOfContactInfo, valueOfContactInfo)
        return this.contactInfo.push(newContactInfo)
    }
    getAllContactinfo() {
        return this.contactInfo
    }
    findContactInfo(contactInfoId){
        for (let index = 0; index < this.contactInfo.length; index++) {
            if(contactInfoId == this.contactInfo[index].id){
                return [this.contactInfo[index], index]
            }
        } return [null, -1]
    }
    updateContactInfo(parameter, newValue,contactInfoId) {
        let [foundContactInfo, indexOfContactInfo] = this.findContactInfo(contactInfoId)
        return foundContactInfo.updateContactInfo(parameter, newValue)
    }
    deleteContactInfo(parameterToBeDeleted,contactInfoId) {
        parameterToBeDeleted = this.findContactInfo(contactInfoId)
        this.contactInfo.splice(parameterToBeDeleted, 1)
        return "Contact Info Deleted"
    }
}
module.exports = Contact
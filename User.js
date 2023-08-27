const Contact = require("./Contact");
const ContactInfo = require("./ContactInfo");

class User {
    static id = 0
    static allUsers = []
    constructor(name, age, gender, isAdmin) {
        this.name = name
        this.age = age
        this.gender = gender
        this.isAdmin = isAdmin
        this.id = User.id++
        this.contacts = []
    }
    #updateName(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid name')
        }
        this.name = newValue

    }
    #updateAge(newValue) {
        if (typeof newValue != 'number') {
            throw new Error('Invalid age')
        }
        this.age = newValue

    }
    #updateGender(newValue) {
        if (typeof newValue != 'string') {
            throw new Error('Invalid gender')
        }
        this.name = newValue

    }
    static newAdmin(name, age, gender) {
        try {
            if (typeof name != 'string') {
                throw new Error('Invalid name')
            }
            if (typeof age != 'number') {
                throw new Error('Invalid age')
            }
            if (gender != 'M' && gender != 'F' && gender != 'O') {
                throw new Error('Invalid gender')
            }
            return new User(name, age, gender, true)
        } catch (error) {
            console.log(error.message)

        }
    }
    newUser(name, age, gender) {
        try {
            if (!this.isAdmin) {
                throw new Error('Not an admin')
            }
            if (typeof name != 'string') {
                throw new Error('Invalid name')
            }
            if (typeof age != 'number') {
                throw new Error('Invalid age')
            }
            if (gender != 'M' && gender != 'F' && gender != 'O') {
                throw new Error('Invalid gender')
            }
            let newUser = new User(name, age, gender, false)
            User.allUsers.push(newUser)
            return newUser
        } catch (error) {
            console.log(error, message)
        }
    }
    getAllusers() {
        try {
            if (!this.isAdmin) {
                throw new Error('not an admin')
            }
            return User.allUsers
        } catch (error) {
            console.log(error.message)
        }
    }
    static #findUser(userId) {
        for (let index = 0; index < User.allUsers.length; index++) {
            if (userId == User.allUsers[index].id) {
                return [User.allUsers[index], index]
            }

        } return [null, -1]
    }
    updateUser(userId, parameter, updatedValue) {
        try {
            if (!this.isAdmin) {
                throw new Error('not an admin');
            }
            let [userToBeUpdated, indexOfUserToBeUpdated] = User.#findUser(userId);

            if (userToBeUpdated == null) {
                throw new Error('user not found');
            }
            switch (parameter) {
                case 'name':
                    userToBeUpdated.#updateName(updatedValue);
                    break;
                case 'age':
                    userToBeUpdated.#updateAge(updatedValue);
                    break;
                case 'gender':
                    userToBeUpdated.#updateGender(updatedValue);
                    break;
                default:
                    throw new Error('Invalid parameter')
            }
            return 'User Updated'
        } catch (error) {
            console.log(error.message);
        }
    }
    deleteUser(userId) {
        try {
            if (!this.isAdmin) {
                throw new Error('not an admin')
            }
            let [userToBeDeleted, indexOfUserToBeDeteted] = User.#findUser(userId)
            if (userToBeDeleted == null) {
                throw new Error('User not found')
            }
            User.allUsers.splice(indexOfUserToBeDeteted, 1)
            return "User Deleted Successfully"
        } catch (error) {
            console.log(error.message)
        }

    }
    createcontact(name){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contacts")
            }
            if(typeof name != "string"){
                throw new Error("Invalid name")
            }
            let newContact = Contact.newContact(name)
            this.contacts.push(newContact)
            return newContact
        } catch (error) {
            console.log(error.message)
        }
    }
    getAllContacts(){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot read contacts")
            }
            return this.contacts
        } catch (error) {
            console.log(error.message)
        }
        return this.contacts
    }
    updateContact(parameter,newValue,contactId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contact ")
            }
            if(contactId <0 || typeof contactId !='number'){
                throw new Error('Enter valid input')

            }
            let [contactToBeUpdated,indexOfContactToBeUpdated]= this.#findContact(contactId)
            if(contactToBeUpdated == null){
                throw new Error("Contact not found")
            }
            return contactToBeUpdated.updateContact(parameter,newValue)
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteContact(contactId){
        try {
            if (this.isAdmin) {
                throw new Error('Admin cannot delete contacts')
            }
            let [contactToBeDeleted, indexOfUserToBeDeteted] = this.#findContact(contactId)
            if (contactToBeDeleted == null) {
                throw new Error('Contact not found')
            }
            this.contacts.splice(indexOfUserToBeDeteted, 1)
            return "User Deleted Successfully"
        } catch (error) {
            console.log(error.message)
        }
    }
    #findContact(contactId){
        for (let index = 0; index < this.contacts.length; index++) {
            if(contactId == this.contacts[index].id){
                return [this.contacts[index],index]
            }
        }return[null,-1]
    }
    createcontactInfo(typeOfContactInfo,valueOfContactInfo,contactId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contact info")
            }
            let foundContact= this.#findContact(contactId)
            if(foundContact == null){
                throw new Error ("Contact not found")
            }
            let newContactInfo = ContactInfo.newContactInfo(typeOfContactInfo,valueOfContactInfo)
            foundContact.contactInfo.push(newContactInfo)
            return newContactInfo
        } catch (error) {
            console.log(error.message)
        }
    }
    updateContactInfo(parameter,newValue,contactInfoId,contactId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contacts")
            }
            if(contactId < 0 && typeof contactId != "number"){
                throw new Error("Invalid ContactId")
            }
            let foundContact= this.#findContact(contactId)
            if(foundContact== null){
                throw new Error("Contact not found")
            }
            return foundContact.updateContactInfo(parameter,newValue,contactInfoId)
        } catch (error) {
            console.log(error.message)
        }
    }
    getAllContactinfo(contactId){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contact info")
            }
            let foundContact= this.#findContact(contactId)
            if(foundContact == null){
                throw new Error("Contact not found")
            }
            return foundContact.getAllContactinfo()
        } catch (error) {
            console.log(error.message)
        }
    }
    deleteContactInfo(contactInfoId,parameterToBeDeleted){
        try {
            if(this.isAdmin){
                throw new Error("Admin cannot create contact info")
            }
            let foundContact= this.findContactInfo(contactInfoId)
            if(foundContact == null){
                throw new Error("Contact not found")
            }
            return foundContact.deleteContactInfo(parameterToBeDeleted)
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = User
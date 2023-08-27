class ContactInfo{
    static id = 0
    constructor(typeOfContactInfo, valueOfContactInfo){
        this.typeOfContactInfo = typeOfContactInfo
        this.valueOfContactInfo = valueOfContactInfo
        this.id = ContactInfo.id++
        this.costomerInfo = []
    }
    static newContactInfo(typeOfContactInfo,valueOfContactInfo){
        if(typeof typeOfContactInfo != "string" && typeof valueOfContactInfo != "string"){
            throw new Error("Invalid Parameter")
        }
        return new ContactInfo(typeOfContactInfo,valueOfContactInfo)
    }
    #updatedTypeOfContactInfo(newValue){
        if(typeof newValue != "string"){
            throw new Error("Invalid value")
        }
        return this.typeOfContactInfo= newValue
    }
    #updatedValueOfContactInfo(newValue){
        if(typeof newValue != "string"){
            throw new Error("Invalid value")
        }
        return this.valueOfContactInfo= newValue
    }
    updateContactInfo(parameter, newValue){
        if(typeof parameter != "string"){
            throw new Error("Invalid parameter")
        }
        switch (parameter) {
            case 'typeOfContactInfo':
                this.typeOfContactInfo=this.#updatedTypeOfContactInfo(newValue)
                break;
            case 'valueOfContactInfo':
                this.valueOfContactInfo = this.#updatedValueOfContactInfo(newValue)
                break
            default:
                throw new Error("Invalid parameter")
        }
        return "Contact Info updated"
    }
}
module.exports = ContactInfo
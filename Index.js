const User = require("./User");

let a1 = User.newAdmin('yash', 26, 'M');
console.log(a1);

let u1 = a1.newUser('simran', 20, 'F');
console.log(u1);

let c1 = u1.createcontact("Madhura");
console.log(c1);

let t1 = c1.createContactInfo("phone", "9988658");
console.log(t1);

let t2 = c1.createContactInfo("home", "9988238");
// console.log(t2);

t1 = c1.updateContactInfo("typeOfContactInfo", "office", 1, 0);
// console.log(t1);


let updatedMessage = c1.updateContactInfo("typeOfContactInfo", "work", 0);
console.log(updatedMessage);


console.log(c1.getAllContactinfo())
console.log(c1.deleteContactInfo("typeOfContactInfo",0))
console.log(c1.getAllContactinfo())

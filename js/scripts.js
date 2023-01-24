//Business Logic for AddressBook

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  this.contacts[contact.firstName] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

//Bussiness Logic for Contacts
function Contact(firstName, lastName, phoneNumber){
this.firstName = firstName;
this.lastName = lastName;
this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

let testContact = new Contact("Ada", "Lovelace", "503-555-1111");

let addressBook = new AddressBook();
let contact = new Contact("Ada", "Lovelace", "503-555-0100");
let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
addressBook.addContact(contact);
addressBook.addContact(contact2);
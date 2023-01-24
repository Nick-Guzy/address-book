//Business Logic for AddressBook

function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

//Business logic to find contact test
AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

//Business logic to delete contact
AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

//Bussiness Logic for Contacts
function Contact(firstName, lastName, phoneNumber, email, streetAddresses){
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.streetAddresses = streetAddresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

//UI logic
let addressBook = new AddressBook();
let contact = new Contact(
  "Ada", 
  "Lovelace", 
  "503-555-0100", 
  "ada@yahoo.com", 
  { home: "123 Penny Lane", work: "322 Franklin Lane" }
);

let contact2 = new Contact("Grace", "Hopper", "503-555-0199", "grace#gmail.com", {home: "426 Jackson Pkwy"});
addressBook.addContact(contact);
addressBook.addContact(contact2);

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  const inputtedStreetAddress = document.querySelector("input#new-street-address").value;
  const inputtedWorkAddress = document.querySelector("input#new-work-address").value;
  let newContact = new Contact(
    inputtedFirstName, 
    inputtedLastName, 
    inputtedPhoneNumber, 
    inputtedEmail, 
    { home: inputtedStreetAddress, work: inputtedWorkAddress }
  );
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email").value = null;
  document.querySelector("input#new-street-address").value = null;
  document.querySelector("input#new-work-address").value = null;
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email").innerText = contact.email;

  document.querySelector(".street-address").innerHTML = null;
  for (const key in contact.streetAddresses) {
    let address = contact.streetAddresses[key];
    let capitalizedType = (key.toUpperCase()[0] + key.substring(1))
    document.querySelector(".street-address").innerHTML += '<p>' + capitalizedType + ': ' + address + '<p>';
  }
  document.querySelector("div#contact-details").removeAttribute("class");
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  console.log(event.target)
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
  listContacts(addressBook);
});

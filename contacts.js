const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function readListContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

function rewriteListContacts(сontacts) {
  return fs.writeFile(contactsPath, JSON.stringify(сontacts, undefined, 2));
}

async function listContacts() {
  const contacts = await readListContacts();
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readListContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readListContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(index, 1);
  await rewriteListContacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await readListContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await rewriteListContacts(contacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

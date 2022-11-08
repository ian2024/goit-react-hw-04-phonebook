import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';
import { Container } from './App.styled';
import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';



export const App = () => {

  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    setContacts(parsedContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


  const addContact = (name, number) => {
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    };
     
    const contactCard = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([contactCard, ...contacts]);

  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getFiltered = () => {
    const nomalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(nomalizedFilter));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  const filteredContact = getFiltered();

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={filteredContact}
        onDelete={deleteContact}
      />
    </Container>
  );
};

export default App;
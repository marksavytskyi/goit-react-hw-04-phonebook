import { useState, useEffect } from 'react';

import Filter from './Filter';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const saveContacts = JSON.parse(localStorage.getItem('contacts'));
    return saveContacts ? saveContacts : [];
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onSubmit = contact => {
    setContacts(prevState => [...prevState, contact]);
  };

  const onChange = value => {
    setFilter(value);
  };

  const onDelete = id => {
    setContacts(prevState => prevState.filter(el => el.id !== id));
  };

  return (
    <div
      style={{
        width: '600px',
        borderRadius: '5px',
        margin: '0 auto 0 auto',
        color: '#010101',
        padding: '40px',
        backgroundColor: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Phonebook</h2>

      <ContactForm onSubmit={onSubmit} contacts={contacts}></ContactForm>

      <h2 style={{ textAlign: 'center' }}>Contacts:</h2>

      <Filter onChange={onChange}></Filter>

      <ContactList
        contacts={contacts}
        filter={filter}
        onDelete={onDelete}
      ></ContactList>
    </div>
  );
};

export default App;

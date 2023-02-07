import { useState } from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid/non-secure';
import { Form, Label, Input, Button } from './ContactForm.styled';

const ContactForm = ({ contacts, onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const changeName = ({ currentTarget: { value, name } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const verifyName = () => {
    const theSame = contacts.filter(({ name: oldName }) => {
      return oldName === name;
    });

    return theSame.length > 0 ? alert(`${name} is already in contacts.`) : true;
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    const id = nanoid();

    verifyName() && onSubmit({ name, number, id });

    resetForm();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name:
        <Input
          onChange={changeName}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          value={name}
        />
      </Label>

      <Label>
        Phone:
        <Input
          onChange={changeName}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
        />
      </Label>

      <Button type="submit">Add to contact</Button>
    </Form>
  );
};

export default ContactForm;

ContactForm.propTypes = {
  onSubmit: PropTypes.func,
  contacts: PropTypes.arrayOf(Object),
};

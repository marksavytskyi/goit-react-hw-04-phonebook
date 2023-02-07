import PropTypes from 'prop-types';

import { List } from './ContactList.styled';

import ContactItem from './ContactItem';

const ContactList = ({ contacts, filter, onDelete }) => {
  return (
    <>
      <List>
        {contacts.map(({ number, name, id }) => {
          const filterCondition = name
            .toUpperCase()
            .includes(filter.toUpperCase());

          return (
            filterCondition && (
              <ContactItem
                key={id}
                name={name}
                number={number}
                handleDelete={() => onDelete(id)}
              ></ContactItem>
            )
          );
        })}
      </List>
    </>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(Object),
  filter: PropTypes.string,
  onDelete: PropTypes.func,
};

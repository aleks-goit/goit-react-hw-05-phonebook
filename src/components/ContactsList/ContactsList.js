import React from 'react';
import ContactListItem from '../ContactsListItem/ContactListItem';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import itemTransition from './transitions/itemTransition.module.css';


function ContactsList({ contacts, onDeleteContact }) {
  return (
    <TransitionGroup component="ul">
      {contacts.map(({ id, name, number }) => (
        <CSSTransition 
        key={id}
        classNames={itemTransition}
        timeout={250}
        >
          <ContactListItem
            name={name}
            number={number}
            onDelete={() => onDeleteContact(id)}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
}

ContactsList.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  onDeleteContact: PropTypes.func,
}

export default ContactsList;

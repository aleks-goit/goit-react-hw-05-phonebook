import React from 'react';
import styles from './ContactsListItem.module.css';
import PropTypes from 'prop-types';

function ContactListItem({ name, number, onDelete }) {
  return (
    <li className={styles.item}>
      <span className={styles.span}>
        {name}: {number}
      </span>
      <button className={styles.button} type="button" onClick={onDelete}>
        X
      </button>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string,
  number: PropTypes.string,
  onDelete: PropTypes.func,
}

export default ContactListItem;

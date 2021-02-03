import React from 'react';
import styles from './Filter.module.css';
import PropTypes from 'prop-types';

function Filter({ value, onChangeFilter }) {
  return (
    <div>
      <label className={styles.label}>
        Search contacts by name
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={e => onChangeFilter(e.target.value)}
        />
      </label>
    </div>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChangeFilter: PropTypes.func,
}

export default Filter;

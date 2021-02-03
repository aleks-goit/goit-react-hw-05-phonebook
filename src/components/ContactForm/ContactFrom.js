import React, { Component } from 'react';
import styles from './ContactFrom.module.css';
import PropTypes from 'prop-types';

export default class ContactForm extends Component {
  static propTypes = {
    onAddContact: PropTypes.func,
  }

  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFormSubmit = e => {
    e.preventDefault();

    this.props.onAddContact({
      name: this.state.name,
      number: this.state.number,
    });
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <label className={styles.label}>
          Number
          <input
          className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInputChange}
            required
          />
        </label>
        <button className={styles.button} type="submit">Add contact</button>
      </form>
    );
  }
}

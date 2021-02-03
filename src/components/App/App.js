import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Layout from '../Layout/Layout';
import Filter from '../Filter/Filter';
import ContactForm from '../ContactForm/ContactFrom';
import ContactsList from '../ContactsList/ContactsList';
import Notification from '../Notification/Notification';
import { CSSTransition } from 'react-transition-group';
import styles from './App.module.css';
import transitionTitle from './transition/transitionTitle.module.css';
import NotificationTransition from '../Notification/transitions/NotificationTransition.module.css';

export default class App extends Component {
  state = {
    contacts: [],
    filter: '',
    isOpenModal: false,
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleContactAdd = contact => {
    const { contacts } = this.state;

    const isIncludes = contacts.some(item => item.name === contact.name);
    if (isIncludes) {
      this.setState({ isOpenModal: true });
      setTimeout(() => {
        this.setState({ isOpenModal: false });
      }, 3000);
      return;
    }

    const contactData = {
      id: uuidv4(),
      name: contact.name,
      number: contact.number,
    };

    this.setState(prevState => ({
      contacts: [contactData, ...prevState.contacts],
    }));
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChangeFilter = filter => {
    this.setState({ filter });
  };

  handleDeleteContact = contactId =>
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));

  filterContacts = () => {
    const { contacts, filter } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  render() {
    const { filter, contacts, isOpenModal } = this.state;

    const filtredContacts = this.filterContacts();
    return (
      <Layout>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={transitionTitle}
        >
          <h2 className={styles.title}>Phonebook</h2>
        </CSSTransition>

        <section className={styles.section}>
          <ContactForm onAddContact={this.handleContactAdd} />
        </section>

        <h2 className={styles.title}>Contacts</h2>
        {contacts.length > 0 ? (
          <section className={styles.section}>
            <Filter value={filter} onChangeFilter={this.handleChangeFilter} />
            <ContactsList
              contacts={filtredContacts}
              onDeleteContact={this.handleDeleteContact}
            />
          </section>
        ) : (
          <h2>Your phonebook is empty.</h2>
        )}
        <CSSTransition
            in={isOpenModal}
            appear={true}
            classNames={NotificationTransition}
            timeout={250}
            unmountOnExit
          >
            <Notification />
          </CSSTransition>
      </Layout>
    );
  }
}

import { Component } from 'react';
import { nanoid } from 'nanoid';

const contactId = nanoid();
const numberId = nanoid();
const filterId = nanoid();

const INITIAL_STATE = {
  contacts: [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],
  name: '',
  number: '',
  filter: '',
};
class Contacts extends Component {
  state = { ...INITIAL_STATE };

  onSubmitForm = evt => {
    evt.preventDefault();
    const { contacts } = this.state;

    const hasName = contacts.some(
      contact => contact.name.toLowerCase() === this.state.name.toLowerCase()
    );

    if (hasName) {
      alert(`${this.state.name} is alredy in contacts`);
      return;
    }
    contacts.push({
      id: nanoid(),
      name: this.state.name,
      number: this.state.number,
    });
    this.handleReset();
    console.log(this.state.contacts);
  };
  handleReset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };
  handleNumberChange = evt => {
    this.setState({ number: evt.target.value });
  };
  handleFilterChange = evt => {
    this.setState({ filter: evt.target.value });
  };
  handleDelete = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { name, contacts, number, filter } = this.state;

    const filteredContacts = contacts.filter(contact => {
      const fullName = contact.name.toLowerCase();
      const filterText = filter.toLowerCase();
      return fullName.includes(filterText);
    });
    return (
      <>
        <h1>Phonebook</h1>
        <form onSubmit={this.onSubmitForm}>
          <label htmlFor={contactId}>Name</label>
          <input
            type="text"
            name="name"
            id={contactId}
            value={name}
            onChange={this.handleNameChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <label htmlFor={numberId}>Phone</label>
          <input
            type="tel"
            name="number"
            id={numberId}
            value={number}
            onChange={this.handleNumberChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <button type="submit">Add contact</button>
        </form>

        <h1>Contacts</h1>
        <label htmlFor={filterId}>Find contacts by name</label>
        <input
          type="text"
          name="filter"
          id={filterId}
          value={filter}
          onChange={this.handleFilterChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        />
        <ul>
          {filteredContacts.map(({ id, name, number }) => (
            <li id={id}>
              {name}: {number}
              <button type="button" onClick={() => this.handleDelete(id)}>
                delete
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

export default Contacts;

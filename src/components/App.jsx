import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid'

import { PhoneBook } from '../components/PhoneBook/PhoneBook'
import { ContactsList } from './ContactsList/ContactsList'
import { Container } from './Container/Container'
import { Filter } from './Filter/Filter'
import { DefaultPage } from './DefaultPage/DefaultPage'
import { Modal } from './Modal/Modal'
import { Alert } from './ModalAlert/ModalAlert'

export function App() {
	const [contacts, setContacts] = useState([]);
	const [filter, setFilter] = useState('');
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {

	}, []);

	const submitHandler = (name, number) => {
		const names = contacts.map(contact => contact.name.toLowerCase())

		if (names.includes(name.toLowerCase())) {
			toggleModal();
			return;
		}

		setContacts([...contacts, { name: name, id: nanoid(), number: number }])

		// this.setState(prevState => {
		// 	return {
		// 		contacts: [...prevState.contacts, { name: name, id: nanoid(), number: number }]
		// 	}
		// })
	}
	console.log(contacts);

	const deleteContact = (itemId) => {
		setContacts(contacts.filter(contact => contact.id !== itemId))
		// this.setState((prevState) => {
		// 	return {
		// 		contacts: prevState.contacts.filter(contact => contact.id !== itemId)
		// 	}
		// })
	}

	const toggleModal = () => {
		setShowModal(true)
		// this.setState(state => ({
		// 	showModal: !state.showModal,
		// }))
	}

	// const changeFilter = e => {
	// 	setFilter(e.target.value)
	// 	const normalizedFilter = filter.toLowerCase();
	// 	filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))
	// 	// this.setState({ filter: e.target.value })
	// }

	// const normalizedFilter = filter.toLowerCase();
	// const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))

	return (<>
		<Container text="PhoneBook">
			{showModal && <Modal onClose={toggleModal}>
				<Alert text="This name is already in contacts." />
			</Modal>}
			<PhoneBook onSubmit={submitHandler} />
		</Container>
		<Container text="Contacts">
			{contacts.length > 0 ?
				<ContactsList state={contacts} deleteContact={deleteContact} />
				:
				<DefaultPage text="Add someone to your contacts" />
			}
			{/* {contacts.length > 0 ?
				(<> {filteredContacts.length > 0 ?
					(<>
						<Filter onChange={changeFilter} />
						<ContactsList state={filteredContacts} deleteContact={deleteContact} />
					</>)
					:
					(<>
						<Filter onChange={changeFilter} />
						<DefaultPage text="There is not such a contact" />
					</>)
				}
				</>)
				:
				<DefaultPage text="Add someone to your contacts" />
			} */}
		</Container>
	</>
	)

	// state = {
	// 	contacts: [],
	// 	filter: '',
	// 	showModal: false,
	// }

	// componentDidUpdate(prevProps, prevState) {
	// 	if (this.state.contacts !== prevState.contacts) {
	// 		localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
	// 	}
	// }

	// componentDidMount() {
	// 	const contacts = localStorage.getItem('contacts');
	// 	const parsedContacts = JSON.parse(contacts)
	// 	if (parsedContacts) {
	// 		this.setState({ contacts: parsedContacts });
	// 	}
	// }

	// submitHandler = (name, number) => {
	// 	const { contacts } = this.state;

	// 	const names = contacts.map(contact => contact.name.toLowerCase())

	// 	if (names.includes(name.toLowerCase())) {
	// 		this.toggleModal();
	// 		return;
	// 	}

	// 	this.setState(prevState => {
	// 		return {
	// 			contacts: [...prevState.contacts, { name: name, id: nanoid(), number: number }]
	// 		}
	// 	})
	// }

	// changeFilter = e => {
	// 	this.setState({ filter: e.target.value })
	// }

	// toggleModal = () => {
	// 	this.setState(state => ({
	// 		showModal: !state.showModal,
	// 	}))
	// }

	// deleteContact = (itemId) => {
	// 	this.setState((prevState) => {
	// 		return {
	// 			contacts: prevState.contacts.filter(contact => contact.id !== itemId)
	// 		}
	// 	})
	// }

	// render() {
	// 	const { filter, contacts, showModal } = this.state;

	// 	const normalizedFilter = filter.toLowerCase();
	// 	const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))

	// 	return (<>
	// 		<Container text="PhoneBook">
	// 			{showModal && <Modal onClose={this.toggleModal}>
	// 				<Alert text="This name is already in contacts." />
	// 			</Modal>}
	// 			<PhoneBook onSubmit={this.submitHandler} />
	// 		</Container>
	// 		<Container text="Contacts">
	// 			{this.state.contacts.length > 0 ?
	// 				(<> {filteredContacts.length > 0 ?
	// 					(<>
	// 						<Filter onChange={this.changeFilter} />
	// 						<ContactsList state={filteredContacts} deleteContact={this.deleteContact} />
	// 					</>)
	// 					:
	// 					(<>
	// 						<Filter onChange={this.changeFilter} />
	// 						<DefaultPage text="There is not such a contact" />
	// 					</>)
	// 				}
	// 				</>)
	// 				:
	// 				<DefaultPage text="Add someone to your contacts" />
	// 			}
	// 		</Container>
	// 	</>
	// 	)
	// }
};

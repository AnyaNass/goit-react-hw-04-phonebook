import React from 'react';
import { nanoid } from 'nanoid'

import { PhoneBook } from '../components/PhoneBook/PhoneBook'
import { ContactsList } from './ContactsList/ContactsList'
import { Container } from './Container/Container'
import { Filter } from './Filter/Filter'
import { DefaultPage } from './DefaultPage/DefaultPage'
import { Modal } from './Modal/Modal'
import { Alert } from './ModalAlert/ModalAlert'

export class App extends React.Component {
	state = {
		contacts: [],
		filter: '',
		showModal: false,
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.state.contacts !== prevState.contacts) {
			localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
		}
	}

	componentDidMount() {
		const contacts = localStorage.getItem('contacts');
		const parsedContacts = JSON.parse(contacts)
		if (parsedContacts) {
			this.setState({ contacts: parsedContacts });
		}
	}

	submitHandler = data => {
		const { contacts } = this.state;
		const { name, number } = data;

		const names = contacts.map(contact => contact.name.toLowerCase())

		if (names.includes(name.toLowerCase())) {
			this.toggleModal();
			return;
		}

		this.setState(prevState => {
			return {
				contacts: [...prevState.contacts, { name: name, id: nanoid(), number: number }]
			}
		})
	}

	changeFilter = e => {
		this.setState({ filter: e.target.value })
	}

	toggleModal = () => {
		this.setState(state => ({
			showModal: !state.showModal,
		}))
	}

	deleteContact = (itemId) => {
		this.setState((prevState) => {
			return {
				contacts: prevState.contacts.filter(contact => contact.id !== itemId)
			}
		})
	}

	render() {
		const { filter, contacts, showModal } = this.state;

		const normalizedFilter = filter.toLowerCase();
		const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter))

		return (<>
			<Container text="PhoneBook">
				{showModal && <Modal onClose={this.toggleModal}>
					<Alert text="This name is already in contacts." />
				</Modal>}
				<PhoneBook onSubmit={this.submitHandler} />
			</Container>
			<Container text="Contacts">
				{this.state.contacts.length > 0 ?
					(<> {filteredContacts.length > 0 ?
						(<>
							<Filter onChange={this.changeFilter} />
							<ContactsList state={filteredContacts} deleteContact={this.deleteContact} />
						</>)
						:
						(<>
							<Filter onChange={this.changeFilter} />
							<DefaultPage text="There is not such a contact" />
						</>)
					}
					</>)
					:
					<DefaultPage text="Add someone to your contacts" />
				}
			</Container>
		</>
		)
	}
};

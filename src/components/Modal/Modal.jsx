import React from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { Backdrop, ModalContent, ModalCloseBtn } from './Modal.styled'

const modalRoot = document.querySelector('#modal-root');

export class Modal extends React.Component {

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown)
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown)
	}

	handleKeyDown = e => {
		if (e.code === "Escape") {
			this.props.onClose();
		}
	}

	handleBackdropclick = e => {
		if (e.target === e.currentTarget) {
			this.props.onClose();
		}
	}

	render() {
		// console.log(this.props);
		return createPortal(
			<Backdrop onClick={this.handleBackdropclick}>
				<ModalContent>{this.props.children}
					<ModalCloseBtn type='button' onClick={this.props.onClose}><FaTimes /></ModalCloseBtn>
				</ModalContent>
			</Backdrop>,
			modalRoot)
	}
}


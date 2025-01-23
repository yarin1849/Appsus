import { Modal } from './Modal.jsx'
import { MailFilter } from './MailFilter.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function MailHeader({ onCloseModal, onToggleModal, isOpen, filterBy, onSetFilterBy }) {
    return (
        <section className="mail-header">

            <div className="logo">
                <NavLink to="/mail"><img src='./assets/img/icons8-gmail-big.svg' alt="icon" /></NavLink>
                <h1>Gmail</h1>
            </div>

            <section>
                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </section>

            <nav>
                <button onClick={onToggleModal} className="modal-btn"><img src='./assets/img/186401_grid_icon.svg' alt="icon" /></button>
                <Modal isOpen={isOpen} onClose={onCloseModal}>
                    <NavLink to="/"><img src='./assets/img/icons8-home.svg' alt="icon" /></NavLink>
                    <NavLink to="/about"><img src='./assets/img/icons8-about-50.svg' alt="icon" /></NavLink>
                    <NavLink to="/mail"><img src='./assets/img/icons8-gmail.svg' alt="icon" className="gmail" /></NavLink>
                    <NavLink to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" /></NavLink>
                </Modal>
            </nav>

        </section>
    )
}
import { Modal } from './Modal.jsx'
import { NoteFilter } from './NoteFilter.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function NoteHeader({ onCloseModal, onToggleModal, isOpen, filterBy, onSetFilterBy }) {
    return (
        <section className="note-header">

            <div className="logo">
                <NavLink to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" /></NavLink>
                <h1>Keep</h1>
            </div>

            <section>
                <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            </section>

            <nav className="nav-modal">
                <button onClick={onToggleModal} className="modal-btn"><img src='./assets/img/icon-apps.svg' alt="icon" /></button>
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
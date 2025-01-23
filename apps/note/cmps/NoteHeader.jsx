import { Modal } from './Modal.jsx'

const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function NoteHeader({onCloseModal, onToggleModal, isOpen}) {

    // const [isOpen, setIsOpen] = useState(false)
    // function ToggleModal() {
    //     setIsOpen(isOpen => !isOpen)
    // }

    return (
        <section className="note-header">

            <div className="logo">
                <NavLink to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" /></NavLink>
                <h1>Keep</h1>
            </div>

            {/* filter section */}

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
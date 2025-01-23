
import { mailService } from "../services/mail.service.js"

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React


export function MailCompose({ isOpen, onClose }) {

    const [MailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())

    const navigate = useNavigate()


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;
        }
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(MailToEdit)
            .then(mail => {
                console.log("Mail sent:", mail)
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                onClose()
                navigate('/mail')
            })
    }

    function toggleModal() {
        return !isOpen
    }

    const { to, subject, body } = setMailToEdit
    if (!isOpen) return
    return (
        <div className="mail-modal-overlay">
            <div className="mail-modal-content">
                <header className="mail-modal-header">
                    <h3>Send Mail</h3>
                    <button onClick={onClose} className="close-button">&times;</button>
                </header>
                <form onSubmit={onSendMail} className="mail-modal-form">
                    <div className="form-group">
                        <label htmlFor="to">To:</label>
                        <input value={to} onChange={handleChange} type="text" name="to" id="to" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subject">Subject:</label>
                        <input value={subject} onChange={handleChange} type="text" name="subject" id="subject" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Body:</label>
                        <textarea value={body} onChange={handleChange} name="body" id="body" rows="5"></textarea>
                    </div>
                    <footer className="modal-footer">
                        <button type="submit" className="send-button">Send</button>
                        <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

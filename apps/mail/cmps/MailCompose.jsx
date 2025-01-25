import { mailService } from "../services/mail.service.js"

const { useNavigate } = ReactRouterDOM
const { useState } = React

export function MailCompose({ isOpen, onClose }) {
    const [mailToEdit, setMailToEdit] = useState(mailService.getEmptyMail())
    const navigate = useNavigate()

    function handleChange({ target }) {
        const field = target.name
        let value = target.value
        if (target.type === "number" || target.type === "range") value = +value

        setMailToEdit((prevMail) => ({ ...prevMail, [field]: value }))
    }

    function onSendMail(ev) {
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then((mail) => {
                console.log("Mail sent:", mail)
            })
            .catch((err) => {
                console.error("Error sending mail:", err)
            })
            .finally(() => {
                onClose()
                navigate("/mail")
            })
    }

    if (!isOpen) return null

    return (
        <div className="mail-modal-overlay">
            <div className="mail-modal">
                <header className="modal-header">
                    <h2>New Message</h2>
                    <button onClick={onClose} className="close-btn">&times;</button>
                </header>
                <form onSubmit={onSendMail} className="modal-body">
                    <div className="form-row"><input value={mailToEdit.to} onChange={handleChange} type="email" name="to" placeholder="Recipients" required /></div>
                    <div className="form-row"><input value={mailToEdit.subject} onChange={handleChange} type="text" name="subject" placeholder="Subject" /></div>
                    <div className="form-row"><textarea value={mailToEdit.body} onChange={handleChange} name="body" rows="5"></textarea></div>
                    <footer className="modal-footer">
                        <button type="submit" className="send-btn">Send</button>
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                    </footer>
                </form>
            </div>
        </div>
    )
}

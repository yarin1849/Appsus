import { utilService } from '../../../services/util.service.js'


const { Link } = ReactRouterDOM;


export function MailPreview({ mail, onRemoveMail, onUnreadMail }) {
    return (
        <div className="mail-preview">
            <Link to={`/mail/${mail.id}`} className="mail-link">
                <div className="mail-row">
                    <section className='mail-info-container'>
                        <span className="mail-from">{mail.from}</span>
                        <span className="mail-subject">{mail.subject}</span>
                        <span className="mail-body"> - {mail.body}</span>
                    </section>
                    <section className='mail-list-end'>
                        <span className="mail-time">{utilService.formatTimestamp(mail.sentAt)}</span>
                        <section className="mail-buttons">
                            <button onClick={(ev) => onRemoveMail(ev, mail.id)}><img src='./assets/img/icon-delete.svg' alt="icon" /></button>
                            <button onClick={(ev) => onUnreadMail(ev, mail.id)}><img src='./assets/img/icon-mark-email-unread.svg' alt="icon" /></button>
                        </section>
                    </section>
                </div>
            </Link>
        </div>
    )
}

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, isRead, handleIsRead, onRemoveMail }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}
                    className={mail.isRead ? 'read' : ''}
                    onClick={() => handleIsRead(mail.id)}
                >
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
                    </section>
                </li>
            )}
        </ul>
    )
}

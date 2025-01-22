import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, isRead, handleIsRead }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}
                    className={mail.isRead ? 'read' : ''}
                    onClick={() => handleIsRead(mail.id)}
                >
                    <MailPreview mail={mail} />
                </li>
            )}
        </ul>
    )
}

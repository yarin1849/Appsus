import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, isRead, handleIsRead, onRemoveMail, onUnreadMail }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li key={mail.id}
                    className={mail.isRead ? 'read' : ''}
                    onClick={() => handleIsRead(mail.id)}
                >
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} onUnreadMail={onUnreadMail} />
                </li>
            )}
        </ul>
    )
}

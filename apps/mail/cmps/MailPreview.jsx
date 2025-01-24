const { Link } = ReactRouterDOM;

export function MailPreview({ mail }) {
    return (
        <div className="mail-preview">
            <Link to={`/mail/${mail.id}`} className="mail-link">
                <div className="mail-row">
                    <span className="mail-from">{mail.from}</span>
                    <span className="mail-subject">{mail.subject}</span>
                    <span className="mail-body"> - {mail.body}</span>
                    <span className="mail-time">{new Date(mail.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
            </Link>
        </div>
    );
}

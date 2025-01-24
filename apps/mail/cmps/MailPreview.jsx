import { getMonthName } from "../../../services/util.service.js";

const { Link } = ReactRouterDOM;

function formatTimestamp(timestamp) {
    const now = new Date()
    const emailDate = new Date(timestamp)
    const diffInMilliseconds = now - emailDate

    const oneDayInMilliseconds = 24 * 60 * 60 * 1000;

    if (diffInMilliseconds < oneDayInMilliseconds) {
        const hours = emailDate.getHours().toString()
        const minutes = emailDate.getMinutes().toString()
        return `${hours}:${minutes}`
    } else {
        const day = emailDate.getDate()
        const month = getMonthName(date)
        return `${day} ${month}`
    }
}

export function MailPreview({ mail }) {
    return (
        <div className="mail-preview">
            <Link to={`/mail/${mail.id}`} className="mail-link">
                <div className="mail-row">
                    <span className="mail-from">{mail.from}</span>
                    <span className="mail-subject">{mail.subject}</span>
                    <span className="mail-body"> - {mail.body}</span>
                    <span className="mail-time">{formatTimestamp(mail.sentAt)}</span>
                </div>
            </Link>
        </div>
    )
}

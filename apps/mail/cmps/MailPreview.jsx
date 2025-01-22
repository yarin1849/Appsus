const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <div className="mail-preview">
            <Link to={`/mail/${mail.id}`}>
                <h1>{mail.subject}</h1>
                <h2>{mail.body}</h2>
            </Link>
        </div >
    )
}
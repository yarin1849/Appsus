const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <div>
            <Link className="mail-preview" to={`/mail/${mail.id}`}>
                <div>{mail.subject}</div>
                <div>{mail.body}</div>
            </Link>
        </div >
    )
}
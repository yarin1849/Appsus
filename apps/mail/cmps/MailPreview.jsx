const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    // console.log('mail', mail)
    return (
        <div className="mail-preview">
            <Link to={`/mail/${mail.id}`} className="mail-preview" >
                <h1>{mail.subject}</h1>
                <h2>{mail.body}</h2>
            </Link>
        </div>
    )
}
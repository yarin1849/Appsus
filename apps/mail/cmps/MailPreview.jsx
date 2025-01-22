export function MailPreview({ mail }) {
    console.log('mail', mail)
    return (
        <div>
            <h1>{mail.subject}</h1>
            <h2>{mail.body}</h2>
        </div>
    )
}
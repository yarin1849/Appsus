import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('Problems getting Emails:', err)
            })
    }









    return <div>mail app</div>
}


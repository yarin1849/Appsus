import { mailService } from "../services/mail.service.js"
import { utilService } from '../../../services/util.service.js'


const { useEffect, useState } = React
const { useParams, Link } = ReactRouterDOM




export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMail()

    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Problem getting mail', err)
                showErrorMsg('Problem getting mail')
                navigate('/mail')
            })
    }


    if (!mail) return <div>Loading...</div>
    return (
        <div className="mail-details">
            <button><Link to={`/mail/`}><img src='./assets/img/icon-back.svg' alt="icon" /></Link></button>
            <h1>{mail.subject}</h1>
            <h2>{mail.from}</h2>
            <span>{utilService.formatTimestamp(mail.sentAt)}</span>
            <div>{mail.body}</div>
        </div>
    )
}


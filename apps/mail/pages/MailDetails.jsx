import { mailService } from "../services/mail.service.js"

const { useEffect, useState } = React
const { useParams } = ReactRouterDOM



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

    function onBack() {
        navigate('/mail')
    }






    if (!mail) return <div>Loading...</div>
    return (
        <div className="mail-details">
            <h1>{mail.subject}</h1>
            <h2>{mail.body}</h2>
        </div >
    )
}


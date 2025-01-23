import { mailService } from "../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"

const { Routes, Route, Navigate } = ReactRouterDOM
const { useState, useEffect } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isRead, setIsRead] = useState({})

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

    function handleIsRead(mailId) {
        mailService.get(mailId)
            .then(prevMail => {
                const updatedMail = { ...prevMail, isRead: !prevMail.isRead }

                setMails(prevMails =>
                    prevMails.map(mail =>
                        mail.id === mailId ? updatedMail : mail
                    )
                )

                mailService.save(updatedMail).catch(err => {
                    console.error('Failed to save mail:', err)
                })
            })
            .catch(err => {
                console.error('Failed to toggle isRead:', err)
            })
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index">
            <MailList
                mails={mails}
                isRead={isRead}
                handleIsRead={handleIsRead}
            />
        </section>
    )
}


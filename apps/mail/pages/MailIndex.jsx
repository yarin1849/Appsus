import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"

const { useSearchParams, Routes, Route, Navigate } = ReactRouterDOM
const { useState, useEffect } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isRead, setIsRead] = useState()
    const [unreadCount, setUnreadCount] = useState(0)
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        setSearchParams(filterBy)
        loadMails()
    }, [filterBy])

    useEffect(() => {
        if (mails) {
            updateUnreadCount()
        }
    }, [mails])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problems getting Emails:', err)
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail Delete successfully!`)
            }).catch(err => {
                console.log('Problems removing mail:', err)
                showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    function handleIsRead(mailId) {
        mailService.get(mailId)
            .then(prevMail => {
                const updatedMail = { ...prevMail, isRead: !prevMail.isRead }
                mailService.save(updatedMail)
                // .then(() => loadMails())
            })
            .catch(err => {
                console.error('Failed to toggle isRead:', err)
            })
    }

    function updateUnreadCount() {
        const unread = mails.reduce((acc, mail) => (mail.isRead ? acc : acc + 1), 0)
        setUnreadCount(unread)
    }

    function openCompose() {
        setIsComposeOpen(true)
    }

    function closeCompose() {
        setIsComposeOpen(false)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index">
            <header>
                <section>
                    <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                </section>
                <h1>Unread Mails: {unreadCount}</h1>
            </header>
            <MailList mails={mails} handleIsRead={handleIsRead}
                onRemoveMail={onRemoveMail} />
            <button onClick={openCompose}>+</button>
            <MailCompose isOpen={isComposeOpen} onClose={closeCompose} />

        </section>
    )
}


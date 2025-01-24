import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailCompose } from "../cmps/MailCompose.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailMenuFilter } from "../cmps/MailMenuFilter.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"

const { useSearchParams, Routes, Route, Navigate } = ReactRouterDOM
const { useState, useEffect } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isRead, setIsRead] = useState()
    const [unreadCount, setUnreadCount] = useState(0)
    const [isComposeOpen, setIsComposeOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
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

    // function formatTimestamp(timestamp) {
    //     const now = new Date()
    //     const emailDate = new Date(timestamp)
    //     const diffInMilliseconds = now - emailDate

    //     const oneDayInMilliseconds = 24 * 60 * 60 * 1000

    //     if (diffInMilliseconds < oneDayInMilliseconds) {
    //         const hours = emailDate.getHours().toString().padStart(2, '0');
    //         const minutes = emailDate.getMinutes().toString().padStart(2, '0');
    //         return `${hours}:${minutes}`;
    //     } else {
    //         const day = emailDate.getDate();
    //         const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //         const month = monthNames[emailDate.getMonth()];
    //         return `${day} ${month}`;
    //     }
    // }

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

    function onSetFilterBy(newFilter) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }));
    }

    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }
    function onCloseModal() {
        setIsOpen(false)
    }


    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index" onClick={() => isOpen && setIsOpen(false)}>
            <MailHeader onCloseModal={onCloseModal} onToggleModal={onToggleModal} isOpen={isOpen} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            {/* <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
            <section className="mail-main-content">
                <section className="mail-menu-filter">
                    <button><img src="./assets/img/icons8-menu.svg" alt="" /></button>
                    <MailMenuFilter isMenuOpen={true} onSetFilterBy={onSetFilterBy} activeFolder={filterBy.folder} unreadCount={unreadCount} />
                </section>
                <MailList mails={mails} handleIsRead={handleIsRead}
                    onRemoveMail={onRemoveMail} />
            </section>

        </section>
    )
}


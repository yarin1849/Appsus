import { mailService } from "../services/mail.service.js"
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailMenuFilter } from "../cmps/MailMenuFilter.jsx"
import { MailHeader } from "../cmps/MailHeader.jsx"

const { useSearchParams } = ReactRouterDOM
const { useState, useEffect } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [unreadCount, setUnreadCount] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))


    useEffect(() => {
        setSearchParams(filterBy)
        console.log('filterBy', filterBy)
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

    function onRemoveMail(ev, mailId) {
        ev.preventDefault()
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail Delete successfully!`)
            }).catch(err => {
                console.log('Problems removing mail:', err)
                showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }

    function onUnreadMail(ev, mailId) {
        ev.preventDefault()
        mailService.get(mailId)
            .then(prevMail => {
                const updatedMail = { ...prevMail, isRead: !prevMail.isRead }
                mailService.save(updatedMail)
            })
            .catch(err => {
                console.error('Failed to toggle isRead:', err)
            })
    }

    function handleIsRead(mailId) {
        mailService.get(mailId)
            .then(prevMail => {
                if (prevMail.isRead === true) return
                const updatedMail = { ...prevMail, isRead: !prevMail.isRead }
                mailService.save(updatedMail)
            })
            .catch(err => {
                console.error('Failed to toggle isRead:', err)
            })
    }

    function updateUnreadCount() {
        const unread = mails.reduce((acc, mail) => (mail.isRead ? acc : acc + 1), 0)
        console.log('unread', unread)
        setUnreadCount(unread)
    }

    function onSetFilterBy(newFilter) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }))
    }

    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    function onCloseModal() {
        setIsOpen(false)
    }

    function onSetFilterByClick(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index" onClick={() => isOpen && setIsOpen(false)}>
            <MailHeader onCloseModal={onCloseModal} onToggleModal={onToggleModal} isOpen={isOpen} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section className="mail-main-content">
                <section className="mail-menu-filter">
                    <MailMenuFilter isMenuOpen={true} onSetFilterBy={onSetFilterByClick} activeFolder={filterBy.folder} unreadCount={unreadCount} />
                </section>
                <MailList mails={mails} handleIsRead={handleIsRead}
                    onRemoveMail={onRemoveMail} onUnreadMail={onUnreadMail} />
            </section>

        </section>
    )
}


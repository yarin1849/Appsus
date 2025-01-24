import { MailCompose } from "../cmps/MailCompose.jsx"
const { useState } = React


export function MailMenuFilter({ isMenuOpen, onSetFilterBy, activeFolder, unreadCount }) {
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    function setFilter(filter) {
        onSetFilterBy({ [filter]: 'user@appsus.com' })
    }

    function openCompose() {
        setIsComposeOpen(true)
    }

    function closeCompose() {
        setIsComposeOpen(false)
    }

    return (
        <section className="mail-menu-filter">
            <nav className={`mail-menu-filter-content ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li>
                        <button onClick={openCompose} className="compose-button"><img src='./assets/img/icons-pen.svg' alt="icon" /></button>
                    </li>
                    <li className={activeFolder === 'inbox' ? 'active' : ''} onClick={() => setFilter('to')}>Inbox
                        {unreadCount > 0 && <span className="unread-count"> {unreadCount}</span>}
                    </li>
                    <li className={activeFolder === 'sent' ? 'active' : ''} onClick={() => setFilter('from')}>Sent</li>
                </ul>
            </nav>
            {
                isComposeOpen && (
                    <MailCompose isOpen={isComposeOpen} onClose={closeCompose} />
                )
            }
        </section>
    )
}

import { MailCompose } from "../cmps/MailCompose.jsx"
const { useState } = React


export function MailMenuFilter({ isMenuOpen, onSetFilterBy, activeFolder, unreadCount }) {
    const [isComposeOpen, setIsComposeOpen] = useState(false)

    function setFilter(filter) {
        onSetFilterBy({ folder: filter })
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
                        <button onClick={openCompose} className="compose-button">Compose</button>
                    </li>
                    <li className={activeFolder === 'inbox' ? 'active' : ''} onClick={() => setFilter('inbox')}>Inbox
                        {unreadCount > 0 && <span className="unread-count"> {unreadCount}</span>}
                    </li>
                    <li className={activeFolder === 'sent' ? 'active' : ''} onClick={() => setFilter('sent')}>Sent</li>
                </ul>
            </nav>
            {isComposeOpen && (
                <MailCompose isOpen={isComposeOpen} onClose={closeCompose} />
            )}
        </section>
    )
}

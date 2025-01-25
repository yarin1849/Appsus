import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { storageServiceAsync } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,

}

function query(filterBy = {}) {
    return storageServiceAsync.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.subject) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.from)
                )
            }
            if (filterBy.from) {
                mails = mails.filter(mail => mail.from === 'user@appsus.com')
                filterBy.from = ''
            } else if (filterBy.to) {
                mails = mails.filter(mail => mail.to === 'user@appsus.com')
                filterBy.to = ''
            }
            if (filterBy.sortBy) {
                mails.sort((a, b) => {
                    if (filterBy.sortBy === 'date') {
                        return b.createdAt - a.createdAt
                    } else if (filterBy.sortBy === 'title') {
                        return a.subject.localeCompare(b.subject)
                    }
                })
            }
            return mails
        })
}


function get(mailId) {
    return storageServiceAsync.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    return storageServiceAsync.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageServiceAsync.put(MAIL_KEY, mail)
    } else {
        return storageServiceAsync.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(createdAt = Date.now(), sentAt = Date.now(), subject = '', body = '', isRead = false, from = 'user@appsus.com', to = '') {
    return {
        id: '',
        createdAt,
        sentAt,
        subject,
        body,
        isRead,
        removedAt: null,
        from,
        to
    }
}

function getDefaultFilter() {
    return {
        subject: '',
        body: '',
        to: 'user@appsus.com',
        from: '',
        sent: '',
        isRead: false,
        sortBy: 'date'
    }
}


function _createMail(createdAt = Date.now(), sentAt = Date.now(), subject = 'Hi', body = 'Hello There', isRead = false, from = 'no-reply@example.com', to = 'user@appsus.com') {
    const id = 'mail-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9)
    return {
        id,
        createdAt,
        sentAt,
        subject,
        body,
        isRead,
        removedAt: null,
        from,
        to
    }
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail(Date.now(), Date.now(), 'Greetings', 'How have you been?', false, 'friend@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 1 * 24 * 60 * 60 * 1000, Date.now() - 1 * 24 * 60 * 60 * 1000, 'Meeting Reminder', 'Don’t forget the meeting tomorrow!', false, 'boss@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 2 * 24 * 60 * 60 * 1000, Date.now() - 2 * 24 * 60 * 60 * 1000, 'Team Updates', 'Here are the latest updates from the team.', false, 'team@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 3 * 24 * 60 * 60 * 1000, Date.now() - 3 * 24 * 60 * 60 * 1000, 'Special Offer', 'Congratulations! You’ve won a special prize!', false, 'promo@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 5 * 24 * 60 * 60 * 1000, Date.now() - 5 * 24 * 60 * 60 * 1000, 'Survey Request', 'Please take a moment to fill out our survey.', true, 'survey@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 6 * 24 * 60 * 60 * 1000, Date.now() - 6 * 24 * 60 * 60 * 1000, 'Project Update', 'Here is the latest update on the project.', true, 'project@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 8 * 24 * 60 * 60 * 1000, Date.now() - 10 * 24 * 60 * 60 * 1000, 'Friendly Reminder', 'Just a friendly reminder about our last chat.', true, 'friend@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 4 * 24 * 60 * 60 * 1000, Date.now() - 40 * 24 * 60 * 60 * 1000, 'Event Invitation', 'You’re invited to our upcoming event!', false, 'event@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now() - 70 * 24 * 60 * 60 * 1000, 'Breaking News', 'Stay updated with the latest news around the world.', false, 'news@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 9 * 24 * 60 * 60 * 1000, Date.now() - 90 * 24 * 60 * 60 * 1000, 'Thank You', 'Thank you for being a valued customer!', false, 'user@appsus.com', 'promo@example.com'),
            _createMail(Date.now() - 10 * 24 * 60 * 60 * 1000, Date.now() - 110 * 24 * 60 * 60 * 1000, 'Welcome to Our Newsletter', 'We’re excited to have you onboard!', false, 'user@appsus.com', 'newsletter@example.com'),
            _createMail(Date.now() - 11 * 24 * 60 * 60 * 1000, Date.now() - 110 * 24 * 60 * 60 * 1000, 'Account Activation', 'Click here to activate your account.', false, 'user@appsus.com', 'service@example.com'),
            _createMail(Date.now() - 12 * 24 * 60 * 60 * 1000, Date.now() - 130 * 24 * 60 * 60 * 1000, 'Your Receipt', 'Here is your receipt for your recent purchase.', false, 'billing@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 13 * 24 * 60 * 60 * 1000, Date.now() - 135 * 24 * 60 * 60 * 1000, 'System Update', 'Our system will undergo maintenance this weekend.', false, 'user@appsus.com', 'system@example.com'),
            _createMail(Date.now() - 14 * 24 * 60 * 60 * 1000, Date.now() - 145 * 24 * 60 * 60 * 1000, 'Happy Birthday!', 'We hope you have a wonderful day!', false, 'greetings@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 15 * 24 * 60 * 60 * 1000, Date.now() - 165 * 24 * 60 * 60 * 1000, 'Exclusive Deal', 'Enjoy an exclusive deal just for you!', true, 'promo@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 16 * 24 * 60 * 60 * 1000, Date.now() - 180 * 24 * 60 * 60 * 1000, 'Important Notice', 'Please review the changes to our terms of service.', false, 'user@appsus.com', 'service@example.com'),
            _createMail(Date.now() - 17 * 24 * 60 * 60 * 1000, Date.now() - 190 * 24 * 60 * 60 * 1000, 'Upcoming Webinar', 'Join us for an exclusive webinar on industry trends.', false, 'webinar@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 18 * 24 * 60 * 60 * 1000, Date.now() - 200 * 24 * 60 * 60 * 1000, 'Weekly Update', 'Here is your weekly update on project progress.', false, 'updates@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 19 * 24 * 60 * 60 * 1000, Date.now() - 210 * 24 * 60 * 60 * 1000, 'Password Reset', 'Click here to reset your password.', true, 'security@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 20 * 24 * 60 * 60 * 1000, Date.now() - 220 * 24 * 60 * 60 * 1000, 'Order Confirmation', 'Your order has been successfully placed.', true, 'sales@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 21 * 24 * 60 * 60 * 1000, Date.now() - 230 * 24 * 60 * 60 * 1000, 'Newsletter', 'Check out the latest updates in our newsletter.', false, 'newsletter@example.com', 'user@appsus.com'),
            _createMail(Date.now() - 22 * 24 * 60 * 60 * 1000, Date.now() - 240 * 24 * 60 * 60 * 1000, 'Job Application Update', 'Your application has been reviewed. Await further updates.', false, 'hr@example.com', 'user@appsus.com'),

        ]

        storageService.saveToStorage(MAIL_KEY, mails)
    }
}


function getFilterFromSearchParams(searchParams) {
    const subject = searchParams.get('txt') || ''
    const body = searchParams.get('txt') || ''
    const isRead = searchParams.get('isRead') === 'true'
    const to = searchParams.get('to') || 'user@appsus.com'
    return {
        subject,
        body,
        isRead,
        to
    }
}



function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}


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
                );
            }
            // if (filterBy.isRead !== undefined && filterBy.isRead !== '') {
            //     mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            // }
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

function getEmptyMail(subject = '', body = '', isRead = false, from = '', to = '') {
    const now = Date.now();
    return {
        id: utilService.makeId(),
        createdAt: now,
        sentAt: now,
        subject,
        body,
        isRead,
        removedAt: null,
        from,
        to
    };
}

function getDefaultFilter() {
    return {
        subject: '',
        body: '',
        to: '',
        isRead: false
    };
}

function _createMails() {
    let mails = storageService.loadFromStorage(MAIL_KEY);
    if (!mails || !mails.length) {
        mails = [
            _createMail('greetings', 'How have you been?', false, 'friend@example.com', 'user@appsus.com'),
            _createMail('reminder', 'Don’t forget the meeting tomorrow!', false, 'boss@example.com', 'user@appsus.com'),
            _createMail('updates', 'Here are the latest updates from the team.', false, 'team@example.com', 'user@appsus.com'),
            _createMail('offer', 'Congratulations! You’ve won a special prize!', false, 'promo@example.com', 'user@appsus.com')
        ];
        storageService.saveToStorage(MAIL_KEY, mails);
    }
}

function _createMail(subject = 'Hi', body = 'Hello There', isRead = false, from = 'no-reply@example.com', to = 'user@appsus.com') {
    const mail = getEmptyMail(subject, body, isRead, from, to);
    return mail;
}

function getFilterFromSearchParams(searchParams) {
    const subject = searchParams.get('txt') || '';
    const body = searchParams.get('txt') || '';
    const isRead = searchParams.get('isRead') === 'true'; // Convert to boolean
    return {
        subject,
        body,
        isRead
    };
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


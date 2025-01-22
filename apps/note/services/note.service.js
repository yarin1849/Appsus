import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'
import { storageServiceAsync } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,

}

function query(filterBy = {}) {
    return storageServiceAsync.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.vendor))
            }

            return notes
        })
}

function get(noteId) {
    return storageServiceAsync.get(NOTE_KEY, noteId)
        .then(note => _setNextPrevNoteId(note))
}

function remove(noteId) {
    // return Promise.reject('Oh No!')
    return storageServiceAsync.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageServiceAsync.put(NOTE_KEY, note)
    } else {
        return storageServiceAsync.post(NOTE_KEY, note)
    }
}

function getEmptyNote(createAt = '', type = '', isPinned = false, style = {}, info = {}) {
    return { createAt, type, isPinned, style, info }
}

function getDefaultFilter() {
    return {
        txt: ''
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(info) {
    const note = getEmptyNote(info)
    note.id = makeId()
    return note
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const minSpeed = searchParams.get('minSpeed') || ''
    return {
        txt,
        minSpeed
    }
}


function _setNextPrevnoteId(note) {
    return query().then((notes) => {
        const noteIdx = notes.findIndex((currnote) => currnote.id === note.id)
        const nextnote = notes[noteIdx + 1] ? notes[noteIdx + 1] : notes[0]
        const prevnote = notes[noteIdx - 1] ? notes[noteIdx - 1] : notes[notes.length - 1]
        note.nextnoteId = nextnote.id
        note.prevnoteId = prevnote.id
        return note
    })
}


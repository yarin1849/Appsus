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
                notes = notes.filter(note => regExp.test(note.type) || regExp.test(note.info.title) 
                || note.info.txt && regExp.test(note.info.txt))
            }

            return notes
        })
}

function get(noteId) {
    return storageServiceAsync.get(NOTE_KEY, noteId)
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

function getEmptyNote(createAt = Date.now(), type = '', isPinned = false, style = { backgroundColor: '#ffffff' }, info = { title: '', txt: '' }, id = '') {
    return { createAt, type, isPinned, style, info, id }
}

function getDefaultFilter() {
    return {
        txt: ''
    }
}

function _createNotes() {
    let notes = storageService.loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        const notes = [
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Daily Motivation',
                    txt: 'Start your day with a positive mindset!'
                }
            },
            {
                id: 'n203',
                createdAt: 1118901,
                type: 'NoteTodos',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Fitness Goals',
                    todos: [
                        { txt: 'Run 3km', doneAt: null },
                        { txt: 'Do 20 push-ups', doneAt: 167111111 },
                        { txt: 'Stretch for 10 minutes', doneAt: null }
                    ]
                }
            },
            {
                id: 'n103',
                createdAt: 1112468,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Books to Read',
                    txt: '1. Atomic Habits\n2. Deep Work\n3. The Pragmatic Programmer'
                }
            },
            {
                id: 'n104',
                createdAt: 1112565,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Shopping List',
                    txt: 'Milk, Eggs, Bread, Avocados, Coffee'
                }
            },
            {
                id: 'n205',
                createdAt: 1112123,
                type: 'NoteTodos',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Errands',
                    todos: [
                        { txt: 'Pick up dry cleaning', doneAt: null },
                        { txt: 'Get car serviced', doneAt: null }
                    ]
                }
            },
            {
                id: 'n105',
                createdAt: 1113456,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Ideas for Vacation',
                    txt: '1. Beach retreat in Bali\n2. Hike in the Alps\n3. Explore Tokyo'
                }
            },
            {
                id: 'n106',
                createdAt: 1114567,
                type: 'NoteTxt',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Meeting Notes',
                    txt: 'Discussed the new feature timeline. Need to finalize design by next week.'
                }
            },
            {
                id: 'n107',
                createdAt: 1115678,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Recipe: Pancakes',
                    txt: 'Ingredients: flour, milk, eggs, sugar. Instructions: Mix and cook on medium heat.'
                }
            },
            {
                id: 'n201',
                createdAt: 1116789,
                type: 'NoteTodos',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Weekend Goals',
                    todos: [
                        { txt: 'Clean the garage', doneAt: null },
                        { txt: 'Read 50 pages of a book', doneAt: null },
                        { txt: 'Plan next week’s meals', doneAt: null }
                    ]
                }
            },
            {
                id: 'n202',
                createdAt: 1117890,
                type: 'NoteTodos',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Work Tasks',
                    todos: [
                        { txt: 'Complete project proposal', doneAt: null },
                        { txt: 'Schedule team meeting', doneAt: null }
                    ]
                }
            },
            {
                id: 'n301',
                createdAt: 1113334,
                type: 'NoteImg',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    url: './assets/img/sunset.png',
                    title: 'Sunset at the Beach'
                }
            },
            {
                id: 'n204',
                createdAt: 1119012,
                type: 'NoteTodos',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Learning Goals',
                    todos: [
                        { txt: 'Complete SQL tutorial', doneAt: null },
                        { txt: 'Solve 3 coding problems on LeetCode', doneAt: null }
                    ]
                }
            },
            {
                id: 'n102',
                createdAt: 1112345,
                type: 'NoteTxt',
                isPinned: false,
                style: { backgroundColor: '#ffffff' },
                info: {
                    title: 'Workout Plan',
                    txt: 'Don’t skip leg day. 30 squats, 20 lunges, and a 2km run!'
                }
            },
            {
                id: 'n302',
                createdAt: 1114445,
                type: 'NoteImg',
                isPinned: true,
                style: { backgroundColor: '#ffffff' },
                info: {
                    url: './assets/img/hiking.png',
                    title: 'Hiking Adventure'
                }
            }
        ];
        
        storageService.saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(info) {
    const note = getEmptyNote(info)
    note.id = utilService.makeId()
    return note
}



function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    return {
        txt,
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


import { NoteList } from "../cmps/NoteList.jsx"
import { EditNote } from "../cmps/EditNote.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
                showSuccessMsg(`note removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing note:', err)
                showErrorMsg(`Problems removing note (${noteId})`)
            })
    }

    function onSetSave(note) {
        noteService.save(note)
            .then(loadNotes)
    }

    if (!notes) return <div>Loading....</div>
    return (
        <section className="note-index">
            <EditNote onSetSave={onSetSave}/>
            <NoteList notes={notes} onRemoveNote={onRemoveNote}/>
        </section>
    )
}




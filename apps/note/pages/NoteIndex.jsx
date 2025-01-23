import { NoteList } from "../cmps/NoteList.jsx"
import { EditNote } from "../cmps/EditNote.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteHeader } from "../cmps/NoteHeader.jsx"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    
    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    function onCloseModal() {
        setIsOpen(false)
    }

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
        <section className="note-index" onClick={() => isOpen && setIsOpen(false)}>
            <NoteHeader onCloseModal={onCloseModal} onToggleModal={onToggleModal} isOpen={isOpen}/>
            <section className="note-edit">

                <EditNote onSetSave={onSetSave} />
            </section>
            <NoteList notes={notes} onRemoveNote={onRemoveNote} />
        </section>
    )
}




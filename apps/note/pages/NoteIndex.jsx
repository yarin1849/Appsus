import { NoteList } from "../cmps/NoteList.jsx"
import { EditNote } from "../cmps/EditNote.jsx"
import { noteService } from "../services/note.service.js"
import { showSuccessMsg } from "../../../services/event-bus.service.js"
import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteMenuFilter } from "../cmps/NoteMenuFilter.jsx"

const { useState, useEffect } = React
const { useSearchParams, Routes, Route, Navigate } = ReactRouterDOM
export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    console.log(filterBy)

    function onToggleModal() {
        setIsOpen(isOpen => !isOpen)
    }

    function onCloseModal() {
        setIsOpen(false)
    }

    useEffect(() => {
        setSearchParams(filterBy)
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
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


    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function onSetFilterByClick(filterBy) {
        console.log(filterBy)
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
        
    }

    if (!notes) return <div>Loading....</div>
    return (
        <section className="note-index" onClick={() => isOpen && setIsOpen(false)}>
            <NoteHeader onCloseModal={onCloseModal} onToggleModal={onToggleModal} isOpen={isOpen} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />

            <section className="note-main-content">
                <section className="note-menu-filter">
                    <button><img src="./assets/img/icons8-menu.svg" alt="" /></button>
                    <NoteMenuFilter onSetFilterBy={onSetFilterByClick} />
                </section>
                <section className="note-edit">
                    <EditNote onSetSave={onSetSave} />
                    <NoteList notes={notes} onRemoveNote={onRemoveNote} />
                </section>
            </section>
        </section>
    )
}




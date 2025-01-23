import { noteService } from "../services/note.service.js"
import { NoteEditTxt } from "./dynamic-edits/NoteEditTxt.jsx"
import { NoteEditTodo } from "./dynamic-edits/NoteEditTodo.jsx"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function EditNote({ onSetSave }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const params = useParams()

    useEffect(() => {
        if (params.noteId) loadNote()
    }, [params.noteId])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => {
                console.log('Problem getting car', err)
            })
    }

    function onHandleChange({ target }) {
        const field = target.name
        let value = target.value

        setNoteToEdit((prevNote) => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value,
            },
        }))
    }

    function onSubmit(ev, noteToEdit) {
        ev.preventDefault()
        onSetSave(noteToEdit)
    }

    return (
        <DynamicNoteEdit promps={noteToEdit} onSubmit={onSubmit} onHandleChange={onHandleChange} />
    )
}

function DynamicNoteEdit({ promps, onSubmit, onHandleChange }) {
    console.log('promps', promps)
    console.log('onsuBmit', onSubmit)
    console.log('onHandleChange', onHandleChange)
    switch (promps.type) {
        case 'NoteTxt':
            return <NoteEditTxt noteToEdit={promps} onSubmit={onSubmit} onHandleChange={onHandleChange} />
        case 'NoteTodos':
            return <NoteEditTodo noteToEdit={promps} onSubmit={onSubmit} onHandleChange={onHandleChange}/>
    }

}
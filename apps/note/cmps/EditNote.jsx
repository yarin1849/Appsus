import { noteService } from "../services/note.service.js"
import { NoteEditTxt } from "./dynamic-edits/NoteEditTxt.jsx"
import { NoteEditTodo } from "./dynamic-edits/NoteEditTodo.jsx"

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function EditNote({ onSetSave }) {
    const [noteToEdit, setNoteToEdit] = useState(noteService.getEmptyNote())
    const [inputValue, setInputValue] = useState('')
    const navagate = useNavigate()
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

    function handleInputClick() {
        noteToEdit.type = 'NoteTxt'
        noteService.save(noteToEdit)
            .then((saveNote) => {
                const noteId = saveNote.id
                navagate(`/note/${noteId}`)
                return saveNote
            })
    }

    function handleButtonClick(event) {
        event.stopPropagation()
        noteToEdit.type = 'NoteTodos'
        noteToEdit.info.todos = []
        noteService.save(noteToEdit)
            .then((saveNote) => {
                const noteId = saveNote.id
                navagate(`/note/${noteId}`)
                return saveNote
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
        navagate(`/note/`)
        onSetSave(noteToEdit)
    }


    if (!params.noteId) return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                background: '#fff',
                maxWidth: '400px',
            }}
        >
            <input
                type="text"
                placeholder="Take a note..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onClick={handleInputClick}
                style={{
                    flex: 1,
                    border: 'none',
                    outline: 'none',
                    fontSize: '16px',
                }}
            />
            <button
                onClick={handleButtonClick}
                style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: '8px',
                }}
            >
                <img
                    src="./assets/img/icons8-check-box.svg"
                    alt="Add Todo"
                    style={{ width: '20px', height: '20px' }}
                />
            </button>
        </div>
    )



    return (
        <DynamicNoteEdit promps={noteToEdit} onSubmit={onSubmit} onHandleChange={onHandleChange} />
    )
}

function DynamicNoteEdit({ promps, onSubmit, onHandleChange }) {
    switch (promps.type) {
        case 'NoteTxt':
            return <NoteEditTxt noteToEdit={promps} onSubmit={onSubmit} onHandleChange={onHandleChange} />
        case 'NoteTodos':
            return <NoteEditTodo noteToEdit={promps} onSubmit={onSubmit} onHandleChange={onHandleChange} />
    }

}
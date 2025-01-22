import { noteService } from "../services/note.service.js"

const { useState, useEffect } = React
const { useParams } = ReactRouterDOM

export function EditNote() {
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
        console.log('target', target)
        const field = target.name
        let value = target.value

        setNoteToEdit((prevNote) => {
            const updatedNote = {
                ...prevNote,
                info: {
                    ...prevNote.info,
                    [field]: value,
                },
            };

            noteService.save(updatedNote)
            return updatedNote
        })
    }

    return (
        <section className="add-note">
            <form>
                <input type="text" name="title" id="title" value={noteToEdit.info.title} onChange={onHandleChange} />
                <input type="text" name="txt" id="txt" value={noteToEdit.info.txt} onChange={onHandleChange} />
            </form>
        </section>
    )
}
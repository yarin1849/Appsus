import { noteService } from "../services/note.service.js"

const {useSatate, useEffect} = React

export function NoteIndex() {
    const [notes, setNotes] = useSatate(null)

    useEffect( () => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(notes => console.log(notes))
    }


    return <div>note app</div>
}


import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes }) {
    return (
        <ul className="note-list">
            {notes.map(note => 
                <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <NotePreview note={note} />
                </li>
            )}
        </ul>
    )
}

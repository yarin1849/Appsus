
import { NotePreview } from './NotePreview.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }}>
                    <div className="card-content">
                        <NotePreview note={note} />
                        <section className="card-actions">
                            <button onClick={() => onRemoveNote(note.id)}><img src="../../assets/img/delete_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" /></button>
                            <button><Link to={`/note/${note.id}`}><img src="../../assets/img/edit_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.png" /></Link></button>
                        </section>
                    </div>
                </li>
            )}
        </ul>
    )
}

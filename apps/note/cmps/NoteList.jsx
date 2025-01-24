
import { NotePreviewImg } from './dynamic-previews/NotePreviewImg.jsx'
import { NotePreviewText } from './dynamic-previews/NotePreviewText.jsx'
import { NotePreviewTodo } from './dynamic-previews/NotePreviewTodo.jsx'

const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li className="card-content" key={note.id} style={note.style ? { backgroundColor: note.style.backgroundColor } : { backgroundColor: 'white' }}>

                        <DynamicPreview {...note} />
                        <section className="card-actions">
                            <button onClick={() => onRemoveNote(note.id)}><img src="./assets/img/icons8-trash.svg" /></button>
                            <button><Link to={`/note/${note.id}`}><img src="./assets/img/icons8-edit.svg" /></Link></button>
                        </section>

                </li>
            )}
        </ul>
    )
}


function DynamicPreview(promps) {
    switch (promps.type) {
        case 'NoteTxt':
            return <NotePreviewText note={promps} />
        case 'NoteImg':
            return <NotePreviewImg note={promps} />
        case 'NoteTodos':
            return <NotePreviewTodo note={promps}/>

    } 
}
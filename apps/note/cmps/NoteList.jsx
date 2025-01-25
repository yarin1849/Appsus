import { showSuccessMsg } from '../../../services/event-bus.service.js';
import { noteService } from '../services/note.service.js';
import { NotePreviewImg } from './dynamic-previews/NotePreviewImg.jsx';
import { NotePreviewText } from './dynamic-previews/NotePreviewText.jsx';
import { NotePreviewTodo } from './dynamic-previews/NotePreviewTodo.jsx';

const { useState } = React;
const { Link } = ReactRouterDOM;

export function NoteList({ notes, onRemoveNote, onloadNotes }) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentNoteId, setCurrentNoteId] = useState(null);

    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F3FF33", "#FF33A8"]; // Example color options

    const openModal = (noteId) => {
        setCurrentNoteId(noteId);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        setCurrentNoteId(null);
    };

    const selectColor = (color) => {
        console.log(color);
        if (currentNoteId) {
            noteService.get(currentNoteId)
                .then(note => {
                    note.style.backgroundColor = color;
                    noteService.save(note).then(onloadNotes);
                });
        }
        closeModal();
    };

    return (
        <ul className="note-list">
            {notes.map(note =>
                <li
                    className="card-content"
                    key={note.id}
                    style={note.style ? { backgroundColor: note.style.backgroundColor } : { backgroundColor: 'white' }}
                >
                    <DynamicPreview {...note} />
                    <section className="card-actions">
                        <button onClick={() => openModal(note.id)} className="color-button-trigger">
                            <img src="./assets/img/icon-palette.svg" alt="Change Color" />
                        </button>
                        <button onClick={() => onRemoveNote(note.id)}>
                            <img src="./assets/img/icon-delete.svg" alt="Delete" />
                        </button>
                        <button>
                            <Link to={`/note/${note.id}`}>
                                <img src="./assets/img/icons-pen.svg" alt="Edit" />
                            </Link>
                        </button>
                    </section>
                </li>
            )}

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="color-options">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => selectColor(color)}
                                    style={{ backgroundColor: color }}
                                    className="color-button"
                                ></button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </ul>
    );
}

function DynamicPreview(promps) {
    switch (promps.type) {
        case 'NoteTxt':
            return <NotePreviewText note={promps} />;
        case 'NoteImg':
            return <NotePreviewImg note={promps} />;
        case 'NoteTodos':
            return <NotePreviewTodo note={promps} />;
        default:
            return null;
    }
}

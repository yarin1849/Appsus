
export function NotePreviewText({ note }) {
    return (
        <section>
            <h1>title: {note.info.title}</h1>
            <h2>{note.info.txt}</h2>
        </section>
    )
}

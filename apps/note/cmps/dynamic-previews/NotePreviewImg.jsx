
export function NotePreviewImg({ note }) {
    return (
        <section>
            <h1>title: {note.info.title}</h1>
            <img src={note.info.url} alt="" />
        </section>
    )
}

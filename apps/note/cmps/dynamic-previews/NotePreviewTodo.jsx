

export function NotePreviewTodo({ note }) {
    console.log(note)
    return (
        <section>
            <h1>{note.info.title}</h1>
            <ul>
                {note.info.todos.map((todo, index) =>
                    <div key={index}>
                        <label>
                            <input type="checkbox" />
                            {todo.txt}
                        </label>
                    </div>
                )}
            </ul>
        </section>
    )
}
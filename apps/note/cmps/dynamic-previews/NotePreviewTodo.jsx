const {useState} = React
export function NotePreviewTodo({ note }) {
    const [activeTodos, setActiveTodos] = useState(
        note.info.todos.map(() => false) 
    )

    const toggleTodo = (index) => {
        setActiveTodos((prevState) =>
            prevState.map((isActive, idx) => (idx === index ? !isActive : isActive))
        )
    }

    return (
        <section className="note-prev-todo">
            <h1>{note.info.title}</h1>
            <ul>
                {note.info.todos.map((todo, index) => (
                    <div key={index}>
                        <label className={activeTodos[index] ? 'active' : ''}>
                            <input
                                type="checkbox"
                                checked={activeTodos[index]}
                                onChange={() => toggleTodo(index)}
                            />
                            {todo.txt}
                        </label>
                    </div>
                ))}
            </ul>
        </section>
    );
}

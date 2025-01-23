const { useState } = React

export function NoteEditTodo({ noteToEdit, onSubmit, onHandleChange }) {
    const [newTodo, setNewTodo] = useState('')

    function handleNewTodoChange({ target }) {
        setNewTodo(target.value)
    }

    function handleAddTodo() {
        if (newTodo.trim()) {
            const updatedTodos = [...noteToEdit.info.todos, { txt: newTodo, completed: false }];
            onHandleChange({ target: { name: 'todos', value: updatedTodos } })
            setNewTodo('');
        }
    }

    function onToggleTodo(index) {
        const updatedTodos = [...noteToEdit.info.todos];
        updatedTodos[index].completed = !updatedTodos[index].completed
        onHandleChange({ target: { name: 'todos', value: updatedTodos } })
    }

    function onSubmitTxt(ev) {
        ev.preventDefault()
        onSubmit(ev, noteToEdit)
    }

    return (
        <section className="add-note">
            <form onSubmit={onSubmitTxt}>
                <input
                    type="text"
                    name="title"
                    value={noteToEdit.info.title || ''}
                    onChange={onHandleChange}
                    placeholder="Enter a title"
                />
                <ul>
                    {noteToEdit.info.todos.map((todo, index) => (
                        <li key={index}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={() => onToggleTodo(index)}
                                />
                                {todo.txt}
                            </label>
                        </li>
                    ))}
                </ul>
                <div>
                    <input
                        type="text"
                        value={newTodo}
                        onChange={handleNewTodoChange}
                        placeholder="Add a new to-do"
                    />
                    <button type="button" onClick={handleAddTodo}>
                        Add
                    </button>
                </div>
                <button type="submit">Save</button>
            </form>
        </section>
    );
}

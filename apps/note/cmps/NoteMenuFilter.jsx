const { useState } = React


export function NoteMenuFilter({ onSetFilterBy}) {

    function setFilter(filter) {
        onSetFilterBy({menu: filter})
    }

    return (
        <section className="note-menu-filter">
            <nav className={`note-menu-filter-content`}>
                <ul>
                    <li onClick={() => setFilter('')}>All notes</li>
                    <li onClick={() => setFilter('NoteTxt')}>Text</li>
                    <li onClick={() => setFilter('NoteTodos')}>Todos</li>
                    <li onClick={() => setFilter('NoteImg')}>images</li>
                </ul>
            </nav>
        </section>
    )
}

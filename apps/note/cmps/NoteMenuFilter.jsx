const { useState } = React


export function NoteMenuFilter({ onSetFilterBy}) {

    function setFilter(filter) {
        onSetFilterBy({ folder: filter })
    }

    return (
        <section className="note-menu-filter">
            <nav className={`note-menu-filter-content`}>
                <ul>
                    <li onClick={() => setFilter('text')}>Text</li>
                    <li onClick={() => setFilter('list')}>Todos</li>
                </ul>
            </nav>

        </section>
    )
}

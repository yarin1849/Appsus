import { debounce } from "../../../services/util.service.js"

const { useState, useEffect, useRef } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    console.log(filterBy)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
        console.log('filterByToEdit', filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('filterByToEdit', filterByToEdit)
        onSetFilterBy(filterByToEdit)
    }


    const { txt } = filterByToEdit

    return (
        <section className="note-filter">
            <form onSubmit={onSubmit}>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" placeholder="Search" />
            </form>
        </section>
    )
}

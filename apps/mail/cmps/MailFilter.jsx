import { debounce } from "../../../services/util.service.js"
import { MailMenuFilter } from "./MailMenuFilter.jsx"


const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const onSetFilterByDebounce = useRef(debounce(onSetFilterBy, 500)).current

    useEffect(() => {
        onSetFilterByDebounce(filterByToEdit)
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
        <section className="mail-filter">
            {/* <MailMenuFilter onSetFilterBy={onSetFilterBy} /> */}
            <h2>Filter Mails</h2>
            <form onSubmit={onSubmit}>
                <input value={txt} onChange={handleChange} type="text" name="txt" placeholder="Search" />
                <button>Search</button>
            </form>
        </section>
    )
}

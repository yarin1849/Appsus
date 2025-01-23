

export function NoteEditTxt({noteToEdit, onSubmit, onHandleChange}) {
    function onHandleChangeTxt({target}) {
        onHandleChange({target})
    }

    function onSubmitTxt(ev) {
            ev.preventDefault()
            onSubmit(ev,noteToEdit)
    }
    return (
        <section className="add-note">
            <form onSubmit={onSubmitTxt}>
                <input type="text" name="title" id="title" value={noteToEdit.info.title} onChange={onHandleChangeTxt} placeholder='title'/>
                <input type="text" name="txt" id="txt" value={noteToEdit.info.txt} onChange={onHandleChangeTxt} placeholder='txt'/>
                <button>save</button>
            </form>
        </section>
    )
}
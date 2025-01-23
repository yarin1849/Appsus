

export function NoteEditTxt({noteToEdit, onSubmit, onHandleChange}) {
    console.log('note', noteToEdit)
    console.log('onsuBmit', onSubmit)
    console.log('onHandleChange', onHandleChange)
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
                <input type="text" name="title" id="title" value={noteToEdit.info.title} onChange={onHandleChangeTxt} />
                <input type="text" name="txt" id="txt" value={noteToEdit.info.txt} onChange={onHandleChangeTxt} />
                <button>save</button>
            </form>
        </section>
    )
}
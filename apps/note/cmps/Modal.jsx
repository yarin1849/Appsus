const { Fragment } = React

export function Modal({ children, isOpen = false, onClose = () => { } }) {
    console.log('children:', children)
    if (!isOpen) return null
    return (
        <Fragment>
            <section className="modal">
                <section onClick={onClose} className='modal-backdrop'></section>
                <section className='modal-content'>
                    {children}
                </section>
            </section>
        </Fragment>
    )
}
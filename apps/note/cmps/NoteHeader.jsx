const { Link, NavLink } = ReactRouterDOM

export function NoteHeader() {
    function showModal() {

    }
    return (
        <section className="note-header">
            
                <div className="logo">
                    <NavLink to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" />Keep</NavLink>
                </div>

                {/* filter section */}

                <nav>
                    <button onClick={showModal}><img src='./assets/img/186401_grid_icon.svg' alt="icon" /></button>
                </nav>
            
        </section>
    )
}
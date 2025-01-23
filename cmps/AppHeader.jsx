const { Link, NavLink, useParams } = ReactRouterDOM


export function AppHeader() {
    
    return <header className="app-header">
        <Link to="/">
        <img src="./assets/img/icons8-google.svg" alt="" />
        </Link>
        <nav>
            <NavLink to="/"><img src='./assets/img/icons8-home.svg' alt="icon"/></NavLink>
            <NavLink to="/about"><img src='./assets/img/icons8-about-50.svg' alt="icon"/></NavLink>
            <NavLink to="/mail"><img src='./assets/img/icons8-gmail.svg' alt="icon" className="gmail"/></NavLink>
            <NavLink to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" /></NavLink>
        </nav>
    </header>
}

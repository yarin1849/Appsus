const { Route, Routes, useParams, Link } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "../cmps/AppHeader";

export function Home() {
    return (

        <section>
            <AppHeader />
            <section className="home main-layout">
                <h1>Welcome to the Best Notes and Email Page Ever!</h1>
                <p>
                    This platform was built by Yarin Bracha and Isaac levy
                </p>

                <section className="navigation">
                    <h2>Explore our website:</h2>
                    <nav>
                        <ul>
                            <li><Link to="/about/"><img src='./assets/img/icons8-about-50.svg' alt="icon" /></Link></li>
                            <li><Link to="/mail/"><img src='./assets/img/icons8-gmail.svg' alt="icon" className="gmail" /></Link></li>
                            <li><Link to="/note"><img src='./assets/img/icons8-google-keep.svg' alt="icon" /></Link></li>
                        </ul>
                    </nav>
                </section>
            </section>
        </section>

    )

}

const { Route, Routes, useParams } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { About } from "./pages/About.jsx"
import { Home } from "./pages/Home.jsx"
import { MailIndex } from "./apps/mail/pages/MailIndex.jsx"
import { MailDetails } from "./apps/mail/pages/MailDetails.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"




export function App() {
    return <Router>
        <section className="app">
            {/* <AppHeader /> */}
            <main className="main-layout">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about/" element={<About />} />
                    <Route path="/note/" element={<NoteIndex />} />
                    <Route path="/note/:noteId/" element={<NoteIndex />} />
                    <Route path="/mail" element={<MailIndex />} />
                    <Route path="/mail/:mailId" element={<MailDetails />} />
                </Routes>
            </main>
        </section>
        <UserMsg />
    </Router>
}
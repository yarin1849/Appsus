import { AppHeader } from "../cmps/AppHeader";

export function About() {
    return (
        <section>
            <AppHeader />
            <section className="about-images">
                <h2>About Us</h2>
                <div className="images">
                    <section>

                        <img src="./assets/img/isaac-img.png" alt="Isaac" title="Isaac" />
                        <div>Isaac Levy 28 years old from Petach Tikva</div>
                    </section>
                    <section>
                        <img src="./assets/img/Yarin.jpg" alt="Yarin" title="Yarin" />
                        <div>Yarin Bracha 26 years old from Rishon leZion</div>
                    </section>
                </div>
            </section>
        </section>
    )
}

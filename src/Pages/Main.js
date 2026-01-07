import React from "react"
import Navbar from "../components/Navbar";
import Landing from "../components/Landing";
import Footer from "../components/Footer";


export default function Main() {
    return (
        <>
            <main>
                <Navbar />
                <Landing />
            </main>
            <Footer />
        </>
    )
}

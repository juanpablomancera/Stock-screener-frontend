import React from "react"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CryptoBTemplate from "./components/CryptoBTemplate";


export default function Crypto() {
    return (
        <>
            <Navbar />
            <main>
                <CryptoBTemplate />
            </main>
            <Footer />
        </>
    )
}
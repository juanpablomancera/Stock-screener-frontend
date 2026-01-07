import React from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CryptoTemplate from "../components/CryptoTemplate";


export default function Crypto() {
    return (
        <>
            <Navbar />
            <main>
                <CryptoTemplate />
            </main>
            <Footer />
        </>
    )
}
import React from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScreenerTemplate from "../components/ScreenerTemplate";


export default function Screener() {
    return (
        <>
            <Navbar />
            <main>
                <ScreenerTemplate />
            </main>
            <Footer />
        </>
    )
}
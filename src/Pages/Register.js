import React from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";

export default function Register() {
    return (
        <>
            <Navbar />
            <main>
                <RegisterForm />
            </main>
            <Footer />
        </>
    )
}

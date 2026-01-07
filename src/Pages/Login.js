import {React} from "react"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";



export default function Login() {

    return (
        <>
            <Navbar />
            <main>
                <LoginForm />
            </main>
            <Footer />
        </>
    )
}

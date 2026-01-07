import {useState} from "react"
import "../ComponentsStyles/forms.css"
import {Link, useNavigate} from "react-router-dom";

export default function LoginForm(){
    const navigate = useNavigate()
    const [formData, setFormData] = useState(
        {
            email: "",
            password: "",
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }

    function restartData(){
        setFormData({
            email: "",
            password:""
        })
    }

    function handleRequest(data){
        if(data.acces_token){
            sessionStorage.setItem("token",data.acces_token)
            navigate("/crypto")
        }
        else{
            window.alert("The user does not exist")
        }
    }

    function handleSubmit(e){
        e.preventDefault()

        const request = new Request("http://localhost:5000/login",{
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        fetch(request)
            .then(res => res.json())
            .then(data => handleRequest(data))

        restartData()


    }
    return (
        <div className="login-form">
            <div className="form">
                <h1 className="login-title">Get logged</h1>
                <label>
                    Email
                </label>
                    <input
                        type="email"
                        onChange={handleChange}
                        name="email"
                        value={formData.email}
                    />

                <label >
                    Password
                </label>
                    <input
                        type="password"
                        onChange={handleChange}
                        name="password"
                        value={formData.password}
                    />
                    <h3>You don't have an account? Register
                        <Link to="/register" style={{ textDecoration: 'underline',color:'#1E1E24' }}> KNOW</Link>
                    </h3>
                <button className="login-form-btn" onClick={handleSubmit}>Login</button>
            </div>
        </div>
    )
}
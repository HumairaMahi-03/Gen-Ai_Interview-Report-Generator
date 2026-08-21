import "../auth.form.scss"
import { useNavigate } from "react-router"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername] = useState("")
    const [ email, setEmail] = useState("")
    const [ password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()


    const handleSubmit = async(e) => {
        e.preventDefault()

        await handleRegister({username, email, password})

        navigate("/")
    }

    if(loading) {
        return (
            <main>
                <div className="form-container">
                    <h1>Loading...</h1>
                </div>
            </main>
        )
    }
  return (
    <main>
    <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                onChange={(e) => setUsername(e.target.value)}
                 type="text" id="username" name="username" placeholder="Enter your name" />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input
                onChange={(e) => setEmail(e.target.value)} 
                type="email" name="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input 
                onChange={(e) => setPassword(e.target.value)}
                type="password" name="password" id="password" placeholder="Enter your password" />
            </div>

            <button className="button primary-button">Register</button>

        </form>
        <p>Already have an account? <span className="link" onClick={() => navigate("/login")}>Login</span></p>
    </div>
</main>
  )
}

export default Register
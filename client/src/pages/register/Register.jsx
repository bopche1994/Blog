import { axiosInstance } from '../../config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './register.css'

export default function Register(props) {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(false)
        try {
            const res = await axiosInstance.post("/auth/register",{
                username,
                email,
                password
            })
            res.data && window.location.replace("/login")
        } catch(err) {
            setError(true)
        }
    }
    return (
        <div className="register">
            <span className="registerTitle">Register</span>
            <form onSubmit={handleSubmit} className="registerForm">
                <label > Username </label>
                <input type="text" 
                    className="registerInput" 
                    placeholder="Enter username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label > Email </label>
                <input type="email" 
                    className="registerInput"
                    placeholder="Enter your email" 
                    onChange={(e) => setEmail(e.target.value)}    
                />
                <label > Password </label>
                <input type="password" 
                    className="registerInput" 
                    placeholder="Enter your password" 
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="registerButton" type="submit" >Register</button>
                <button className="registerLoginButton" >
                    <Link to='/login' className="link"> Login </Link>
                </button>
                {error && <span>Something Went wromg </span>}
            </form>
        </div>
    )
}

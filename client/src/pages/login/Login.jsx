import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config';

export default function Login() {
    const userRef = useRef()
    const passwordRef = useRef()
    const {dispatch, isFetching} = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: "LOGIN_START"})
        try {
            const res = await axiosInstance.post("/auth/login",{
                username: userRef.current.value,
                password: passwordRef.current.value
            })
            dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        } catch (error) {
            dispatch({type: "LOGIN_FAILURE"})
        }

    }
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form  onSubmit={handleSubmit} className="loginForm">
                <label > Username </label>
                <input type="text" className="loginInput" placeholder="Enter your username" ref={userRef}/>
                <label > Password </label>
                <input type="password" className="loginInput" placeholder="Enter your password" ref={passwordRef}/>
                <button className="loginButton" type="submit" disabled={isFetching}>Login</button>
                <button className="loginRegisterButton">
                    <Link to='/register' className="link"> Rgister </Link>
                </button>
            </form>
        </div>
    )
}

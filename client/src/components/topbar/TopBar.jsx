import React, { useContext } from 'react'
import './topbar.css'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';

export default function TopBar() {
    const {user, dispatch} = useContext(Context)
    const handleLogout = () => {
        dispatch({type: "LOGOUT"})
    }
    // const PF  = "http://localhost:5000/images/"
    function convertBufferToBase64(buffer) {
        let binaryStr = '';
        const byteArray = new Uint8Array(buffer);
        for (let i = 0; i < byteArray.byteLength; i++) {
          binaryStr += String.fromCharCode(buffer[i]);
        }
        return btoa(binaryStr);
    }
    return (
        <div className="top">
            <div className="topLeft">
                <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"> 
                    <i className="topIcon fab fa-facebook-square"></i> 
                </a>
                <a href="https://twitter.com/login?lang=en-gb" target="_blank" rel="noreferrer"> 
                    <i className="topIcon fab fa-twitter"></i> 
                </a>
                <a href="https://in.pinterest.com/login/" target="_blank" rel="noreferrer"> 
                    <i className="topIcon fab fa-pinterest"></i> 
                </a>
                <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noreferrer"> 
                    <i className="topIcon fab fa-instagram-square"></i>
                </a>    
            </div>
            <div className="topCenter">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to='/' className="link"> HOME </Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/' className="link"> ABOUT </Link> 
                    </li>
                    <li className="topListItem">
                        <Link to='/' className="link"> CONTACT </Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/write' className="link"> WRITE </Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/' className="link" onClick={handleLogout}> {user && "LOGOUT"} </Link>
                    </li>
                </ul>
            </div>
            <div className="topRight">
                {   user ? (
                    <Link to="/settings" className="link">
                        <img
                        className="topImage"
                        src={user.phototest ? `data:image/jpeg;charset=utf-8;base64,${convertBufferToBase64(user.phototest.data)}` : "NoImage"}
                        // src={PF + user.profilePic}
                        // src="https://images.pexels.com/photos/7224160/pexels-photo-7224160.jpeg?cs=srgb&dl=pexels-simon-gough-7224160.jpg&fm=jpg"
                        alt="Not found"
                        />
                    </Link>
                ):
                ( 
                <ul className="topList">
                    <li className="topListItem">
                        <Link to='/login' className="link"> LOGIN </Link>
                    </li>
                    <li className="topListItem">
                        <Link to='/register' className="link"> REGISTER </Link> 
                    </li>
                </ul>
                )
                }
                <i className="topSearchIcon fas fa-search"></i>

            </div>
            
        </div>
    )
}

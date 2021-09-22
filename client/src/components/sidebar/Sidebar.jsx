import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config';
import { Link } from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
    const [cats, setCats] = useState([])
    useEffect(() => {
        const getCats = async() => {
            const res = await axiosInstance.get(`/categories`)
            setCats(res.data)
        }
        getCats()
    },[cats])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img
                    // height="80px" width="80px"
                    src="https://images.pexels.com/photos/7224160/pexels-photo-7224160.jpeg?cs=srgb&dl=pexels-simon-gough-7224160.jpg&fm=jpg"
                    alt="Not found"
                />
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur, minima.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                    {cats.map( c => (
                        <Link key={c._id} to={`/?cat=${c.name}`} className="link">
                            <li  className="sidebarListItem">{c.name} </li>
                        </Link>
                        
                    ))}

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <a href="https://www.facebook.com/" target="_blank" rel="noreferrer"> 
                        <i className="sidebarIcon fab fa-facebook-square"></i> 
                    </a>
                    <a href="https://twitter.com/login?lang=en-gb" target="_blank" rel="noreferrer"> 
                        <i className="sidebarIcon fab fa-twitter"></i>
                    </a>
                    <a href="https://in.pinterest.com/login/" target="_blank" rel="noreferrer"> 
                        <i className="sidebarIcon fab fa-pinterest"></i>
                    </a>
                    <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noreferrer"> 
                        <i className="sidebarIcon fab fa-instagram-square"></i>
                    </a>   
                </div>
            </div>

        </div>
    )
}

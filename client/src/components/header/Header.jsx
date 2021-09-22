import React from 'react'
import './header.css'

export default function Header() {
    return (
        <div className="Header">
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>
        </div>
            <img className="headerImg" src="https://images.pexels.com/photos/4406315/pexels-photo-4406315.jpeg?cs=srgb&dl=pexels-eberhard-grossgasteiger-4406315.jpg&fm=jpg" alt="not found" />
        </div>
    )
}

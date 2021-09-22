import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config';
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import { useLocation } from 'react-router';

// const baseURL = "http://localhost:5000/api";

export default function Home() {
    const [posts, setPosts] = useState([])
    const {search} = useLocation()


    useEffect(() => {
        const fetchPosts  = async() => {
            // const res = await axios.get(`{baseURL}/posts`)
            const res = await axiosInstance.get(`/posts${search}`)
            setPosts(res.data)
        }
        fetchPosts()
    }, [search])
    return (
        <>
            <Header />
            <div className="home">
                <Posts posts={posts}/>
                <Sidebar/>
            </div>
        </>
    )
}

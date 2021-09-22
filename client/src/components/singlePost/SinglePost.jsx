import { axiosInstance } from '../../config';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context'
import './singlePost.css'

export default function SinglePost() {
    const location = useLocation()
    const path = location.pathname.split('/')[2]
    const [post, setPost] = useState({})
    // const PF = "http://localhost:5000/images/"
    const {user} = useContext(Context)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [updateMode, setUpdateMode] = useState(false)
    function convertBufferToBase64(buffer) {
        let binaryStr = '';
        const byteArray = new Uint8Array(buffer);
        for (let i = 0; i < byteArray.byteLength; i++) {
          binaryStr += String.fromCharCode(buffer[i]);
        }
        return btoa(binaryStr);
    }
    
    useEffect(()=>{
        const getPost = async () =>{
            const res = await axiosInstance.get(`/posts/${path}`)
            setPost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
            setCategory(res.data.category)
        }
        getPost()
    },[path])

    const handleDelete =async () => {
        try {
            await axiosInstance.delete(`/posts/${post._id}`,{data : {username: user.username}})
            window.location.replace("/")
        } catch (err) {
            
        }  
    }
    const handleUpdate = async () =>{
        try {
            await axiosInstance.patch(`/posts/${post._id}`,
            {
                username: user.username,
                title,
                desc,
                category
            })
            // window.location.reload()
            setUpdateMode(false)
        } catch (err) {
            
        }
    }
    return (
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && (
                <img 
                    // src="https://images.pexels.com/photos/1420016/pexels-photo-1420016.jpeg?cs=srgb&dl=pexels-irina-iriser-1420016.jpg&fm=jpg" alt="Not Found" 
                    // src={PF + post.photo}
                    src={`data:image/jpeg;charset=utf-8;base64,${convertBufferToBase64(post.phototest.data)}`}
                    alt=""
                    className="singlePostImg" 
                />
                )}
                {updateMode ? <input type="text" 
                    className="singlePostTitleInput" 
                    value={title} 
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                    /> : 
                    (
                    <h1 className="singlePostTitle">
                        {title}
                        {   post.username === user.username && (
                        <div className="singlePostEdit">
                        <i className="singlePostIcon far fa-edit"
                            onClick={() => setUpdateMode(true)}
                        ></i>
                        <i className="singlePostIcon fas fa-trash"
                            onClick={handleDelete}
                        ></i>
                        </div>
                        )}
                    </h1>
                )}
                <div className="singlePostInfo">
                    <span className="SinglePostAuthor">Author:
                        <Link className="link" to={`/?user=${post.username}`}> <b>{post.username}</b> </Link>
                    </span> 
                    {updateMode ? (
                        <>
                        <span className="SinglePostAuthor">Category: </span>
                        <select id="category" className="SinglePostOption" onChange={(e) => setCategory(e.target.value)}>
                            {category && <option name="category" value = {category}>{category}</option>}
                            <option name="category" value = "Music">Music</option>
                            <option name="category" value = "Life">Life</option>
                            <option name="category" value = "Sports">Sports</option>
                            <option name="category" value = "Science">Science</option>
                            <option name="category" value = "Technology">Technology</option>
                            <option name="category" value = "Food">Food</option>
                        </select>
                        </>
                    ):
                    (<span className="SinglePostAuthor">Category:
                        <Link className="link" to={`/?cat=${post.category}`}> <b>{post.category}</b> </Link>
                    </span> 
                    )}
                    <span className="SinglePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                
                { updateMode ? (<textarea className="singlePostDescInput" value={desc} onChange={(e) =>setDesc(e.target.value)} />) : 
                    (<p className="singlePostDesc"> {desc}</p> )
                }
                {updateMode &&  <button className="singlePostButton" onClick={handleUpdate} >Update</button> }
                
            </div>
        </div>
    )
}

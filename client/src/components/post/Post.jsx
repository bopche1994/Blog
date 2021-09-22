import React from 'react'
import './post.css'
import { Link } from "react-router-dom"

export default function Post(props) {
    const {post} = props
    // console.log( post.phototest );
    // const  { data } = post.phototest;
    // console.log( data )
    // console.log(imgtest)
    function convertBufferToBase64(buffer) {
        let binaryStr = '';
        const byteArray = new Uint8Array(buffer);
        for (let i = 0; i < byteArray.byteLength; i++) {
          binaryStr += String.fromCharCode(buffer[i]);
        }
        return btoa(binaryStr);
      }
    // const PF = "http://localhost:5000/images/"
    return (
        <div className='post'>
            {post.photo && (
            <img 
            className="postImg"
            // src="https://images.pexels.com/photos/1420016/pexels-photo-1420016.jpeg?cs=srgb&dl=pexels-irina-iriser-1420016.jpg&fm=jpg" alt="" 
            // src={PF + post.photo} 
            src={`data:image/png;charset=utf-8;base64,${convertBufferToBase64(post.phototest.data)}`}
            alt=""
            />)}
            <div className="postInfo">
                {/* <div className="postCats">
                    {post.categories.map(cat => (
                        <span key={post._id} className="postCat">{cat}</span>
                    ))}
                </div> */}
                <div className="postCats">
                    <span  className="postCat">{post.category}</span>
                </div>
                <Link to={`/post/${post._id}`} className="link"> 
                    <span className="postTitle" >{post.title}</span>
                </Link>
                <hr/>
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc"> {post.desc}</p>
        </div>
    )
}

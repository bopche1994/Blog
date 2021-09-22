import React from 'react'
import Post from '../post/Post'
import './posts.css'

export default function Posts(props) {
    const {posts} = props
    return (
        <div className="posts">
            {posts.map(post => (
                <Post key={post._id} post={post}/>
            ))}
        </div>
    )
}

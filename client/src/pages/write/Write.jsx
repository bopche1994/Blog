import React, { useContext, useState } from 'react'
import { axiosInstance } from '../../config';
import { Context } from '../../context/Context'
import './write.css'

export default function Write() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [category, setCategory] = useState("")
    const [file, setFile] = useState(null)
    const [ err, setErr] = useState(false)
    const {user} = useContext(Context)


    const handleSubmit = async (e) => {
        e.preventDefault()
        setErr(false)
        const newPost = {
            title,
            desc,
            username: user.username,
            category
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            newPost.photo = filename
            try {
                await axiosInstance.post("/upload", data)
            } catch (error) {
                setErr(true)
            }
        }
        try {
            const res = await axiosInstance.post("/posts",newPost)
            res.data && window.location.replace("/post/"+res.data._id)
        } catch (error) {
            setErr(true)
        }
    }
    return (
        <div className="write">
            {file && (
            <img className="writeImg" 
                // src="https://images.pexels.com/photos/1420016/pexels-photo-1420016.jpeg?cs=srgb&dl=pexels-irina-iriser-1420016.jpg&fm=jpg" 
                src={URL.createObjectURL(file)}
                alt="" />
            )}
            {err && <p className="errWrite">Title name already exists or image sixe is greater than 90MB</p>}
            <p className="errWrite">Title and description are required field</p>
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{display:'none'}} onChange={e => setFile(e.target.files[0])}/>
                    <input type="text" required placeholder="Title" className="writeInput" autoFocus={true}
                        onChange={e => setTitle(e.target.value)}
                    />
                </div>
                <div className="writeFormGroup"> 
                    <label className="writeSelectCategoryLabel" htmlFor="category">
                        Choose the category for your content :
                    </label>
                    <select id="category" className="writeSelectCategory" onChange={(e) => setCategory(e.target.value)}>
                        <option name="category" value = "Music">Music</option>
                        <option name="category" value = "Life">Life</option>
                        <option name="category" value = "Sports">Sports</option>
                        <option name="category" value = "Science">Science</option>
                        <option name="category" value = "Technology">Technology</option>
                        <option name="category" value = "Food">Food</option>
                    </select>
                </div>
                <div className="writeFormGroup">
                    <textarea required placeholder="Tell Your Story..." type="text"
                        className="writeInput writeText"
                        onChange={e => setDesc(e.target.value)}>    
                    </textarea>
                </div>
                <button className="writeSubmit" type="submit">Publish</button>
            </form>
        </div>
    )
}

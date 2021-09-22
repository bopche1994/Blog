import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import { axiosInstance } from '../../config';

export default function Settings() {
    const {user, dispatch} = useContext(Context)
    const [file, setFile] = useState(null)
    // const [username, setUsername] = useState("")
    // const [email, setEmail] = useState("")
    // const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [address, setAddress] = useState("")
    const [mobileno, setMobileno] = useState()
    const [success, setSuccess] = useState(false)
    
    // const PF  = "http://localhost:5000/images/"
    function convertBufferToBase64(buffer) {
        let binaryStr = '';
        const byteArray = new Uint8Array(buffer);
        for (let i = 0; i < byteArray.byteLength; i++) {
          binaryStr += String.fromCharCode(buffer[i]);
        }
        return btoa(binaryStr);
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: 'UPDATE_START'})
        const updatedUser = {
            userId: user._id,
            name,
            address,
            mobileno
        }
        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name;
            data.append("name", filename)
            data.append("file", file)
            updatedUser.profilePic = filename
            try {
                await axiosInstance.post("/upload", data)
                setSuccess(true)
            } catch (error) {
                console.log('error comming')
            }
        }
        try {
             const res = await axiosInstance.put("/users/" + user._id , updatedUser)
             dispatch({type: 'UPDATE_SUCCESS', payload: res.data})
             setSuccess(true)
        } catch (error) {
            dispatch({type: 'UPDATE_FAILURE'})
            
        }
    }
    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle">Delete Your Account</span>
                </div>
                <form  className="settingsForm" onSubmit={handleSubmit}>
                    <label > Profile Picture</label>
                    <div className="settingsPP">
                        {user && <img 
                            src={file ? URL.createObjectURL(file) : (user.phototest ? `data:image/jpeg;charset=utf-8;base64,${convertBufferToBase64(user.phototest.data)}`: "NoImage")}
                            //  src="https://images.pexels.com/photos/1420016/pexels-photo-1420016.jpeg?cs=srgb&dl=pexels-irina-iriser-1420016.jpg&fm=jpg" 
                             alt="Not Found" 
                            //  className="settingsPPImg"
                        />}
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon far fa-user-circle"></i>
                        </label>
                        <input type="file" id="fileInput" style={{display:'none'}} onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                        {/* <label >UserName</label>
                        <input type="text" 
                            placeholder={user.username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <label >Email</label>
                        <input type="email" 
                            placeholder={user.email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label >Password</label>
                        <input type="password" 
                            onChange={(e) => setPassword(e.target.value)}
                        /> */}
                        <label >Name</label>
                        <input type="text" 
                            placeholder={user.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label >Address</label>
                        <input type="text" 
                            placeholder={user.address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        <label >Mobile No : </label>
                        <input type="number" 
                            placeholder={user.mobileno}
                            onChange={(e) => setMobileno(e.target.value)}
                        />
                        <button className="settingsSubmit" type="submit">Update</button>
                        {success && <span style={{ color: "green", textAlign: "center", margin:"20px"}}> Profile has been updated successfuly</span>}
                </form>
            </div>
            <Sidebar/>
        </div>
    )
}

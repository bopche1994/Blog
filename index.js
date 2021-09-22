const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const authRoute = require('./routes/auth')
const usersRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const path = require('path')
const Test = require('./models/testmodel')

const app = express()

dotenv.config()


app.use(cors())

app.use(express.json())
app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/posts",postRoute)
app.use("/api/categories",categoryRoute)

app.use("/images", express.static(path.join(__dirname,"/images")))


// const storage = multer.diskStorage({
//     destination:(req, file, cb) => { cb(null,'images')},
//     filename:(req,file,cb) => {cb(null,req.body.name)} 
// })
// const upload = multer({ storage: storage })
// app.post("/api/upload", upload.single("file"), (req,res) =>{
//     res.status(200).json("File has been uploaded")
// })

const upload = multer({
    // storage: storage
    limits: {
        fileSize: 9000000
    }
})

app.post("/api/upload", upload.single("file"), async (req,res) =>{
    try {
        // console.log(req.params)
        // console.log(req.file.buffer)
        const test = new Test({phototest:req.file.buffer})
        await test.save()
        res.status(200).json("File has been uploaded")
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }

})




mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("Connected to mongodb database")).catch(
    (err) => console.log(err)
)

app.use(express.static(path.join(__dirname, "/client/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});

app.listen(process.env.PORT || 5000, () => {
    console.log("backend is running")
})
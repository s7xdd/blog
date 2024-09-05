require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const UserModel = require('./Models/UserSchema')
const PostModel = require('./Models/Post')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const uploadMiddleware = multer({dest: 'uploads/'})
const fs = require('fs')

var salt = bcrypt.genSaltSync(10);
const secret = 'abcaaaabbbbccccaaaaabc'

app.use(cors({credentials:true , origin: 'http://localhost:5173'}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))


mongoose.connect(process.env.MONGO)
    .then((response) => console.log('Mongo connection success'))
    .then((error) => console.log(error))

app.get('/', (req,res) => {
    res.send('Request successful on GET')
})

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try {
        const checkUser = await UserModel.findOne({username})
        if(checkUser){
            res.status(400).json({message: "User already exists"})
        }
        else {
            const response = await UserModel.create({
                username,
                password: bcrypt.hashSync(password, salt)
            })
            res.status(200).json({message: "User created successfully"})
        }
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "User not created"})
    }
   
})

app.post('/login', async (req,res) => {
    const {username, password} = req.body;
    try {
        const userDoc = await UserModel.findOne({username: username})
        const passOk = bcrypt.compareSync(password, userDoc.password)
        if(passOk){
            //logged in
            jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
                if (err) throw err;
                res.cookie('token', token).json({
                    id:userDoc._id,
                    username,
                })
            })
        }
        else {
            //not logged in
            res.status(400).json({message: "Failed"})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "Failed"})
    }
   
})

app.get('/profile', (req,res) => {
    const {token} = req.cookies;

    jwt.verify(token, secret, {}, (err,info) => {
        if(err) throw err;
        res.json(info)
    })    
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    try{
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1]
        const newPath = path + '.' + ext
        fs.renameSync(path, newPath)
        
        const {token} = req.cookies;

        jwt.verify(token, secret, {}, async (err,info) => {
            if(err) throw err;
            const{title,summary,content} = req.body;
            const postDoc = await PostModel.create({
                title,      
                summary,    
                content,    
                cover: newPath,
                author: info.id,
            })
            res.json(postDoc);
        })      
    }

    catch(error){
        res.status(400).json({msg: 'Error'})
    }

})


app.get('/post', async (req,res) => {
    const posts = await PostModel.find().populate('author', 'username');
    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const post = await PostModel.findOne({_id: id}).populate('author', 'username')
    res.json(post)
})

app.listen(4000, () => {
    console.log("Listening")
}) 



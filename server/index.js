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

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'))


mongoose.connect(process.env.MONGO)
    .then((response) => console.log('Mongo connection success'))
    .then((error) => console.log(error))

app.get('/', (req,res) => {
    res.send('Request successful')
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
                res.cookie('token', token, { withCredentials: true, httpOnly: false}).json({
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
    if(token){

        try {
            jwt.verify(token, secret, {}, (err,info) => {
            if(err) throw err;
            res.json(info)
        })   
    } catch (error) {
        res.status(400).json(error) 
    }
} else {
    res.status(400).json({mssg: "Error"})
}
     
})

app.post('/logout', (req,res) => {
    res.cookie('token', '').json('ok')
})

app.post('/post', uploadMiddleware.single('file'), async (req,res) => {
    const {token} = req.cookies;
    if(token){
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
    }

    else{
        res.status(400).json({msg: 'Error'})
    }
    

})

app.put('/post/:id', uploadMiddleware.single('file'), async(req,res) => {
   
    try {
        let newPath = null;

    if(req.file){
        const {originalname,path} = req.file;
        const parts = originalname.split('.');
        const ext = parts[parts.length-1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
    }

    const {token} = req.cookies;

    if(token){

        
        jwt.verify(token, secret, {}, async (err,info) => {
        if(err) throw err;
        const{id, title, summary, content} = req.body;
        const postDoc = await PostModel.findById(id);
        
        const isAuthor = postDoc.author == info.id
        
        if(!isAuthor){
            return res.status(400).json('You are not the author')
        }
        
        postDoc.title = title;
        postDoc.summary = summary;
        postDoc.content = content;
        postDoc.cover = newPath ? newPath : postDoc.cover
        
        await postDoc.save();
        
        res.json(postDoc);
    })       
    
    } else {
        res.status(400).json({msg: 'Error'})
    }
} catch (error) {
    console.log(error)  
}

})


app.get('/home/post', async (req,res) => {
    const posts = await PostModel.find().populate('author', 'username').sort({createdAt: -1}).limit(6);
    res.json(posts);
})

app.get('/post', async (req,res) => {

        const post = await PostModel.find();
        res.json(post)
        if(!post){
            res.status(400).json({msg: 'Not found'})
        }
})

app.get('/post/:id', async (req, res) => {
    const {id} = req.params;
    const post = await PostModel.findOne({_id: id}).populate('author', 'username')
    res.json(post)
})

app.get('/post/search/:title', async (req,res) => {
    const {title} = req.params;
    try {
        const post = await PostModel.find({
            $or: [
                { title: { $regex: title, $options: 'i' } },
                { summary: { $regex: title, $options: 'i' } }
              ]
        })
        res.json(post)
        if(!post){
            res.status(400).json({msg: 'Not found'})
        }
    } catch (error) {
        res.status(400).json({msg: 'Error'})
    }
})

app.delete('/post/:id', async (req,res) => {
    const {token} = req.cookies;
    if(token){
        try {
            jwt.verify(token, secret, {}, async (err,info) => {
            if(err) throw err;
            const {id} = req.params;
            const postDoc = await PostModel.findById(id);
            if(postDoc){
                const isAuthor = postDoc.author == info.id
                if(!isAuthor){
                    return res.status(400).json('You are not the author')
                }
                await postDoc.deleteOne({_id: id});
            }
            res.status(200).json({msg: 'Success'});
        })       
    } catch (error) {
        console.log(error)
        res.status(400).json({msg: 'error'})
    }
 }
 else {
    res.status(400).json({msg: 'Error'})
 }
})

app.post('/contactme', (req,res) => {
    const {Name, Email, Subject, Message} = req.body;
    res.json(`Thank you for contacting me. I will be in touch with you soon!`)

})


app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
    console.log(process.env.ORIGIN_URL)
}) 



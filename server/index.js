require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const UserModel = require('./Models/UserSchema')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')

var salt = bcrypt.genSaltSync(10);
const secret = 'abcaaaabbbbccccaaaaabc'

app.use(cors({credentials:true , origin: 'http://localhost:5173'}))
app.use(bodyParser.json())
app.use(cookieParser())

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

app.post('/post', (req,res) => {
    
})

app.listen(4000, () => {
    console.log("Listening")
})



require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const { default: mongoose } = require('mongoose')
const UserModel = require('./Models/UserSchema')
const bcrypt = require('bcryptjs');

var salt = bcrypt.genSaltSync(10);
app.use(cors())
app.use(bodyParser.json())

mongoose.connect(process.env.MONGO)
    .then((response) => console.log('Mongo connection success'))
    .then((error) => console.log(error))

app.get('/', (req,res) => {
    res.send('Request successful on GET')
})

app.post('/register', async (req,res) => {
    const {username, password} = req.body;
    try {
        const response = await UserModel.create({
            username,
            password: bcrypt.hashSync(password, salt)
        })
        res.status(200).json({message: "User created successfully"})
    } catch (error) {
        console.log(error)
        res.status(400).json({message: "User not created"})
    }
   
})

app.listen(4000, () => {
    console.log("Listening")
})
// TITLE: main app logic, utilises middlewares

const config = require('./utils/config')
// const http = require('http')
const express = require('express')
// intialise Express application
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
// intialise the router specified
const blogsRouter = require('./controllers/blogs')

// const mongoUrl = 'mongodb://localhost/bloglist'
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())

// use blogsRouter object for handling queries to the path specified
app.use('/api/blogs', blogsRouter)
//app.use('/api/users', usersRouter)
//app.use('/api/login', loginRouter)

module.exports = app

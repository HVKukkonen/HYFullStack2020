// TITLE: controller for blogs routing

// create router object
const blogsRouter = require('express').Router()
// import Blog from models
const Blog = require('../models/blog')
// const User = require('../models/user')
// const config = require('../utils/config')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

// export the defined router 
module.exports = blogsRouter

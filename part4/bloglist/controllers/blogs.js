const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const { tokenExtractor } = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1})
      
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)


    if(body.title === undefined){
      return response.status(400).send('no title')
    }
    else if(body.url === undefined){
      return response.status(400).send('no url')
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes === undefined ? 0 : body.likes,
      user: user._id

    })
      
    const saved = await blog.save()
    user.blogs = user.blogs.concat(saved._id)
    await user.save()

    const formatted = saved.toJSON()
    response.status(201).json(formatted)
  })

  blogsRouter.put('/:id', async (request, response) => {
    const blog = new Blog(request.body).toJSON()
    try {
      await Blog.findByIdAndUpdate(request.params.id, blog)
      response.json(blog)
    }
    catch (exeption){
      console.log(exeption)
    }
  })

  blogsRouter.delete('/:id', async (request, response) => {

    const token = tokenExtractor(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const userid = decodedToken.id
    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() !== userid.toString){
      return response.status(401).send('error: only the creator of a post can delete it')
    }


    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      console.log(exception)
    }
  })

  module.exports = blogsRouter
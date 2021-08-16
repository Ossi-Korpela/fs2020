const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { errorHandler } = require('../utils/middleware')



usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10

  if(!body.password){
      return response.status(400).send('error: request missing password field')
  }
  else if(body.password.length < 3){
      return response.status(400).send('error: password must 3 or more characters long')
  }
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  
    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())   

  
})

usersRouter.get('/', async (request, response) => {
    
    const users = await User.find({}).populate('blogs')
    console.log(users)
    return response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
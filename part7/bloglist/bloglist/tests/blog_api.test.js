const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
const User = require('../models/user')

const api = supertest(app)
let token = ""

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())

    await api.post('/api/users').send({"username" : "testi", "password": "salasana", "name": "ttttt"})
    const res = await api.post('/api/login').send({"username" : "testi", "password": "salasana"})
    token = "bearer "+ res.body.token
    console.log('token ', token)
    

    await Promise.all(promiseArray)
})

test('blogs are returned as json + length is correct', async () => {


    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
})

test('identifier is id and not _id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
        expect(blog._id).toBe(undefined)
    })

})

test('cant post new blogs', async () => {


    await api
        .post('/api/blogs')
        .set('Authorization', token)
        .send({ title: "React patterns+1", author: "Michael Channnnnnnn", url: "https://reactpatterns.com/thisisnew", likes: 777777 })

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)    
        

})

test('blog with empty like field has 0 likes', async () => {
    await api
        .post('/api/blogs')        
        .set('Authorization', token)
        .send({ title: "React patterns+2", author: "jhgdfgdfdfggd", url: "bing.com"})
    const blogsAtEnd = await helper.blogsInDb()

    
    expect(blogsAtEnd.filter(blog => blog.likes === undefined).length).toBe(0)
    
})

test('post without title is met with 400', async () => {
    await api
        .post('/api/blogs')        
        .set('Authorization', token)
        .send({ author: "Michael Channnnnnnn", url: "https://reactpatterns.com/thisisnew", likes: 777777 })
        .expect(400)


})

test('post without url is met with 400', async () => {
    await api
        .post('/api/blogs')        
        .set('Authorization', token)
        .send({ title: "Reacsdft patterns+1", author: "Michael Chanfsdnnnnnnn", likes: 778777 })
        .expect(400)

})



afterAll(() => {
  mongoose.connection.close()
})
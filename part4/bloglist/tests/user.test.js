const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('verysecet', 10)
    const user = new User({ username: 'testinimi', name : 'weewoo', passwordHash: passwordHash })

    await user.save()
  })

  test('creation succeeds with a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testinlululuimni',
      name: 'testi tollo',
      password: 'sala',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with a missing password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'sdfgdsfg',
      name: 'sdfgsdfg',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)


  })

  test('creation fails with a missing name', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aaaaaaa',
      password: 'fsbbbbbbbf'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)


  })

  
  test('creation fails if username already used', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testinimi',
      name: 'testimies',
      password: 'pword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})


afterAll(() => {
    mongoose.connection.close()
  })



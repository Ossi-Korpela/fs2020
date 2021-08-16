import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Route, useRouteMatch, Link } from "react-router-dom"
import { Form, Button, Navbar, Nav, Table, Jumbotron } from 'react-bootstrap'

import { initBlogs, createBlog, deleteBlog, likeBlog, commentBlog} from './reducers/blogReducer'
import { initUsers } from './reducers/usersReducer'
import { login, logout, userFromToken } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import SingleBlog from './components/SingleBlog'


import './App.css'



const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification.msg)
  const user = useSelector(state => state.user.user)
  const users = useSelector(state => state.users)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  

  useEffect(() => {
    dispatch(userFromToken())
  }, [dispatch])

  
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logout())
  }

  const handleCreation = async (blogObject) => {
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`Added ${blogObject.title} by ${blogObject.author}`, 5))
  }

  const handleDelete = async (blogObject) => {
    if(window.confirm(`Do you want to delete ${blogObject.title} by ${blogObject.author}`)){
      dispatch(deleteBlog(blogObject.id))
      dispatch(setNotification(`Deleted ${blogObject.title} succesfully`))
    }    
  }

  const handleLike = async (blogObject) => {
    dispatch(likeBlog(blogObject))
    dispatch(setNotification(`You liked ${blogObject.title} by ${blogObject.author}`, 5))
  }

  const handleComment = async (comment, blogObject) => {
    dispatch(commentBlog(comment, blogObject))
  }

  const userMatch = useRouteMatch('/users/:id')
  const singleUser = userMatch
    ? users.find(urs => urs.id === userMatch.params.id)
    : null
  
  const blogMatch = useRouteMatch('/blogs/:id')
  const singleBlog = blogMatch
    ? blogs.find(blog => blog.id === blogMatch.params.id)
    : null

  
  if (user === null) {
    return (
      <div id="login-form">
        <Notification message={notification} />

        <h2>Login to application</h2>
        <Form onSubmit={handleLogin}>          
        <div>
          username
            <input
            id="login-username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            id="login-password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <Button id="login-button" type="submit">login</Button>
        </Form>
      </div>
    )
  }

  return (
    <div className='container'>
      <Jumbotron>
       <h1>blogs</h1>
      </Jumbotron>
      <Notification message={notification} />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className='mr-auto'>
            <Nav.Link href='#' as="span">
              <Link to='/'>blogs</Link>{' '}
            </Nav.Link>
            <Nav.Link href='#' as="span">
              <Link to='/users/'>users</Link>            
            </Nav.Link>
            <Nav.Link href='#' as="span">
              {user.name} logged in
            </Nav.Link>

            <Nav.Link href='#' as="span">
              <Button variant='danger' onClick={handleLogout}>logout</Button>
            </Nav.Link>            
          </Nav>
        </Navbar.Collapse>
      </Navbar>
   
      <Switch>
        <Route path='/users/:id'>
          <SingleUser user={singleUser}/>
        </Route> 
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/blogs/:id'>
          <SingleBlog blog={singleBlog} handleLike={handleLike} handleComment={handleComment}/>
        </Route>
        <Route path='/'>
        <Togglable buttonLabel="create">
          <BlogForm handleCreation={handleCreation}/>
        </Togglable>      
        
        <Table striped  bg="dark" bordered="true" id="all-blogs">
          <tbody>
        {blogs.map((blog) =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
        )}
        </tbody>
        </Table>
        </Route>
      </Switch>
    </div>
  )
}

export default App
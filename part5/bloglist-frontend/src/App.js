import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)


  function compareBlogs(b1, b2){
    if(b1.likes > b2.likes){
      return -1
    }
    else{
      return 1
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort(compareBlogs) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const Notification = ({message}) => {
    if(message === null){
      return null
    }
    return(
      <div className="msg">
        {message}
      </div>
    )
  }

  const handleCreation = async (blogObject) => {

    try{
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      setErrorMessage(`a new blog: ${blogObject.title} by ${blogObject.author} added`)
      setTimeout(() => {setErrorMessage(null)
      }, 5000)
    }
    catch(exception){
      setErrorMessage(`Error adding a new blog`)
      setTimeout(() => {setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (blogObject) => {
    try{
      await blogService.edit(blogObject)
      let liked = blogs.find(b => b.id === blogObject.id)
      liked.likes += 1
      setBlogs(blogs.map(b => b.id === blogObject.id ? liked : b))
      setBlogs( blogs.sort(compareBlogs) )
      console.log('like done')
    }
    catch(exeption){
      console.log(exeption)
    }
  }

  const handleDelete = async (blog) => {
    try{
      if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setErrorMessage(`blog removed successfully`)
        setTimeout(() => {setErrorMessage(null)
          }, 5000)
      }

    }
    catch (exeption){
      setErrorMessage(`Error deleting blog`)
        setTimeout(() => {setErrorMessage(null)
          }, 5000)
      console.log(exeption)
    }
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try{
      window.localStorage.removeItem('loggedNoteappUser')
      setUser(null)
    }
    catch (exeption){
      setErrorMessage("error logging out")
      setTimeout(() => {setErrorMessage(null)},5000)
    }
  }

  if (user === null) {
    return (
      <div id="login-form">
        <Notification message={errorMessage} />

        <h2>Login to application</h2>
        <form onSubmit={handleLogin}>          
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
        <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <p>{user.name} logged in</p><button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="create">
        <BlogForm handleCreation={handleCreation}/>
      </Togglable>      
      
      <div id="all-blogs">
      {blogs.map((blog) =>
        <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} />
      )}
      </div>
    </div>
  )
}

export default App
import React, {useState} from 'react'
import { Link } from 'react-router-dom'


const Blog = ({ blog, handleLike, handleDelete }) => {
  
  const [expanded, setExpanded] = useState(false)
  

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const like = (event) => {
    event.preventDefault()
    const likedBlog = {"user": blog.user,
                       "likes": blog.likes +1,
                       "author": blog.author,
                       "title": blog.title,
                       "url": blog.url,
                       "id" : blog.id  
  }
    handleLike(likedBlog)
  
  }

  const remove = (event) => {
    event.preventDefault()
    handleDelete(blog)
  }

  if(expanded){
    return(
      <tr>
        {blog.title}<button className="toggle-expanded-button" onClick={toggleExpanded}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes}<button className="like-button" onClick={like}>like</button> <br/>
        {blog.author} <br/>
        <button onClick={remove}>remove</button>
      </tr>
    )
  }
  return(
  <tr>
    <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
  </tr>
  )
}

export default Blog

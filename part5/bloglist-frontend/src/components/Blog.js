import React, {useState} from 'react'


const Blog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [expanded, setExpanded] = useState(false)
  

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }
  const like = (event) => {
    event.preventDefault()
    const likedBlog = {"user": blog.user.id,
                       "likes": blog.likes+1,
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
      <div style={blogStyle}>
        {blog.title}<button className="toggle-expanded-button" onClick={toggleExpanded}>hide</button> <br/>
        {blog.url} <br/>
        {blog.likes}<button className="like-button" onClick={like}>like</button> <br/>
        {blog.author} <br/>
        <button onClick={remove}>remove</button>
      </div>
    )
  }
  return(
  <div style={blogStyle}>
    {blog.title} {blog.author} <button onClick={toggleExpanded}>view</button>
  </div>
  )
}

export default Blog

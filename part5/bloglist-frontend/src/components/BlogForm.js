import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({handleCreation}) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogUrl, setBlogUrl] = useState('')

    const newBlog = (event) => {
        event.preventDefault()
        const blog = {  "title":`${blogTitle}`, 
                        "author":`${blogAuthor}`, 
                        "url":`${blogUrl}`}
        handleCreation(blog)
    }

    return(
        <div className="blogForm">
        <h2>create new</h2>
      <form onSubmit={newBlog}>
        <div>
          title 
          <input
          id="formTitle"
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({target}) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
          id="formAuthor"
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({target}) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
          id="formUrl"
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({target}) => setBlogUrl(target.value)}
          />
        </div>
        <button type="submit">submit</button>        

      </form>
      </div>
    )
    
}
BlogForm.propTypes = {
  handleCreation : PropTypes.func.isRequired
}


export default BlogForm
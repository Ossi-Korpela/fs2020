import React, {useState} from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'


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
      <Form onSubmit={newBlog}>
        <div>
          title <br/>
          <input
          id="formTitle"
          type="text"
          value={blogTitle}
          name="Title"
          onChange={({target}) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author <br/>
          <input
          id="formAuthor"
          type="text"
          value={blogAuthor}
          name="Author"
          onChange={({target}) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url <br/>
          <input
          id="formUrl"
          type="text"
          value={blogUrl}
          name="Url"
          onChange={({target}) => setBlogUrl(target.value)}
          />
        </div>
        <Button type="submit">submit</Button>        

      </Form>
      </div>
    )
    
}
BlogForm.propTypes = {
  handleCreation : PropTypes.func.isRequired
}


export default BlogForm
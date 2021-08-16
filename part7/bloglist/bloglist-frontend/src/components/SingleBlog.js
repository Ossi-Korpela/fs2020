import React, { useState } from 'react'
import { Button } from 'react-bootstrap'


const SingleBlog = ({blog, handleLike, handleComment}) => {
    const [comment, setComment] = useState('')
    if(!blog){
        return null
    }
    
    
    const addComment = (event) => {
        console.log(blog, comment)
        event.preventDefault()
        handleComment(comment, blog)
        setComment('')
    }

    return(
        <div>
            <h2>{blog.title}</h2>
            <a href={blog.url}>{blog.url}</a>
            <p>{blog.likes} likes</p> <Button onClick={() => handleLike({...blog, likes: blog.likes +1})}>like</Button>
            <p>{`added by ${blog.user.name}`}</p>
            <h3>comments</h3>           
            
            <form onSubmit={addComment}>
                <input type='text'
                        id='comment-box'
                        name='comment-box'
                        value={comment} 
                        onChange={({target}) => setComment(target.value)}
                        />
                <Button type='submit'>add comment</Button>
            </form>
            {blog.comments
                ? <ul> {blog.comments.map(comment => <li key={blog.id+ Math.random()*100000}>{comment}</li>)}</ul>
                : null
            }
            
        </div>
    )
}

export default SingleBlog
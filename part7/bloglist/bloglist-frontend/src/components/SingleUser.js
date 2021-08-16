import React from 'react'

const SingleUser = (user) => {
    
    if(!user.user){
        return null
    }
    console.log(user)
    
    return(
        <div>
            <h3>{user.user.name}</h3>
            <h4>added blogs</h4>
            <ul>
                {                  
                    user.user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)                  
                }
            </ul>
        </div>
    )
}

export default SingleUser
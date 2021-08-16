import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

function compareBlogs(b1, b2){
    if(b1.likes > b2.likes){
      return -1
    }
    else{
      return 1
    }
  }

const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'COMMENT':
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case 'NEW_BLOG':
            return state.concat(action.data)
        case 'INIT_BLOGS':
            return action.data.sort(compareBlogs)
        case 'DELETE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'LIKE_BLOG':
            console.log(action.data)          
            return state.map(blog => blog.id === action.data.id ? action.data : blog).sort(compareBlogs)
        default:
            return state
    }
}

export const deleteBlog = (blogId) => {
    return async dispatch => {
        try {
            await blogService.remove(blogId)
            dispatch({
                type : 'DELETE_BLOG',
                data : blogId
            })
        }
        catch (err) {
            dispatch(setNotification('', 5))
        }
    }
}

export const commentBlog = (comment, blog) => {
    return async dispatch => {
        try {
            const commentedBlog = await blogService.commentBlog(comment, blog.id)
            dispatch({
                type : 'COMMENT',
                data : commentedBlog
            })
        }
        catch (err) {
            dispatch(setNotification('Failed to comment the blog', 5))
        }
    }
}


export const likeBlog = (editedBlog) => {
    return async dispatch => {
        try {
            console.log(editedBlog)
            await blogService.edit(editedBlog)
            dispatch({
                type : 'LIKE_BLOG',
                data : editedBlog
            })
        }
        catch (err) {
            dispatch(setNotification('Error liking a blog', 5))
        }        
    }
}


export const initBlogs = () => {
    return async dispatch => {
        try {
            const blogs = await blogService.getAll()
            dispatch({
                type : 'INIT_BLOGS',
                data : blogs
            })
        }
        catch (err) {
            dispatch(setNotification('Error getting blogs', 5))
        }         
    }
}

export const createBlog = (blogObject) => {
    return async dispatch => {
        try {
            const blog = await blogService.create(blogObject)
            dispatch({
                type : 'NEW_BLOG',
                data : blog
            })
        }
        catch (err) {
            dispatch(setNotification('Error creating a blog', 5))
        }        
    }
}

export default blogReducer






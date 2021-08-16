import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken  = newToken => {
  token = `bearer ${newToken}`
}

const commentBlog = (comment, id) => {
  const newUrl = baseUrl + '/' + id + '/comments'
  const request = axios.post(newUrl, {comment : comment})
  return request.then(response => response.data)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newBlogObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlogObject, config)
  return response.data
}

const edit = async editedBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const newUrl = baseUrl +"/"+ editedBlog.id
  const response = await axios.put(newUrl, editedBlog, config)
  return response.data
}

const remove = async idToBeRemoved => {
  const config = {
    headers: { Authorization: token },
  }
  const newUrl = baseUrl + "/" + idToBeRemoved
  const request = axios.delete(newUrl, config)
  return request.data
}

export default { getAll , create, edit, remove, setToken, commentBlog }
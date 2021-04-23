import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

const create = async (anecdote) => {
    const response = await axios.post(baseUrl, {content: anecdote, id: getId, votes: 0})
    return response.data
}

const edit = async (id,anecdote) => {
    const newUrl = baseUrl + `/${id}`
    const response = await axios.put(newUrl, anecdote)
    return response.data
}

export default {getAll, create, edit} // eslint-disable-line 
import React, { useState } from 'react'
import {  useMutation } from '@apollo/client'

import { NEW_BOOK, ALL_BOOKS, ALL_AUTHORS, BOOKS_IN_GENRE } from './queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(NEW_BOOK, {
    refetchQueries: [ {query: ALL_BOOKS}, {query: ALL_AUTHORS}, {query: BOOKS_IN_GENRE} ],
    onError: (error) => {
      console.log(error.message)
    }
  })


  const submit = async (event) => {
    event.preventDefault()
     createBook({ variables : {  title: title, author: author, published: published , genres: genres }})
   
    
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }
  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
import React from 'react'
import { useQuery } from '@apollo/client'
import { BOOKS_IN_GENRE } from './queries'


const Recommendations = (props) => {
  
  const result = useQuery(BOOKS_IN_GENRE, {variables: {genre: props.genre}})
  
  
  if (!props.show) {
    return null
  }

  if(result.loading || !result.data){
    return <div>
      loading books...
    </div>
  }
  

  if(!props.genre){
    return(
        <p>Login to show recommendations</p>
    )
}
const filter = props.genre
const books = result.data.allBooks




  let filtered_books
  filter
    ? filtered_books = books.filter(book => book.genres.includes(filter))
    : filtered_books = books
  if(!filtered_books){
    <p>No recommendations for you</p>
  }

  return (
    <div>
      <h2>recommendations</h2>

      {`books in your favourite genre ${filter}`}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {filtered_books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
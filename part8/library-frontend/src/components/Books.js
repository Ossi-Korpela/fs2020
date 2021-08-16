
import React, {useState, useEffect} from 'react'
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOKS_IN_GENRE, BOOK_ADDED } from './queries'


const Books = (props) => {
  const [filter, setFilter] = useState('')
  const [books, setBooks] = useState([])
  
  const allBooks = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(BOOKS_IN_GENRE, {variables: {genre: filter}})

  const updateBooks = (filter) => {
    getBooks({variables: {filter: filter}})
  }
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData}) => {
      setBooks(props.client.readQuery({ query: ALL_BOOKS }).allBooks)
    }        
  })

  useEffect(() => {    
    if(result.data){
      setBooks(result.data.allBooks)
    }    
  },[result, filter]) //eslint-disable-line

    

  if (!props.show) {
    return null
  }
  if(!result.loading && !result.data){
    updateBooks(filter)
  }

  if(result.loading || !result.data || books === [] || books === {}){
    return <div>
      loading books...
    </div>
  }

  


  let all_genres = []  
  allBooks.data.allBooks.forEach(book => {
    book.genres.forEach(genre => {
      if(!all_genres.includes(genre)){
        all_genres.push(genre)
      }
    })
  })
  
  
  return (
    <div>
      <h2>books</h2>

      {
        filter
          ? `in genre ${filter}`
          : null
      }
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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {all_genres.map(genre => 
        <button key={genre} onClick={() => {setFilter(genre)
                                            updateBooks(filter)}}>{genre}</button>
      )}
      <button onClick={() => {setFilter('')
                              updateBooks(filter)  }}>all genres</button>
    </div>
  )
}

export default Books
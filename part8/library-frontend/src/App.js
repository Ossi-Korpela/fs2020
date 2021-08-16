import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { GETUSER, BOOK_ADDED, ALL_BOOKS, ALL_AUTHORS, BOOKS_IN_GENRE } from './components/queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null) //eslint-disable-line
  const client = useApolloClient()
  const user = useQuery(GETUSER)

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const updateBookCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      set.map(b => b.id).includes(object.id)
    }
    const authorExists = (allAuthors, name) => {
      allAuthors.map(a => a.name).includes(name)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    const authorsInStore = client.readQuery({ query : ALL_AUTHORS})
    if(!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook)}
      })
      
      if(authorExists(authorsInStore.allAuthors, addedBook.author.name)){
        client.writeQuery({
          query: ALL_AUTHORS,
          data : { allAuthors : authorsInStore.allAuthors.map(auth => auth.name === addedBook.author.name ? {...auth, bookCount : auth.bookCount +1} : auth)}
        })
      }

      

    }
  }

  
  
  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData}) => {
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateBookCacheWith(addedBook)
    },
    refetchQueries:  [ {query: ALL_AUTHORS}, {query: BOOKS_IN_GENRE, variables: {genre: user ? user.favoriteGenre : ''}}  ]    
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        {localStorage.getItem('user-token') 
          ? <button onClick={() => logout()} >logout</button>
          : <button onClick={() => setPage('login')}>login</button>
          }
        
      </div>

      <Authors
        show={page === 'authors'}
        client={client}
      />

      <Books
        show={page === 'books'}
        client={client}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommendations'}
        genre={(!user.loading && user.data.me) ? user.data.me.favoriteGenre : null}
        />
      
      <Login
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App
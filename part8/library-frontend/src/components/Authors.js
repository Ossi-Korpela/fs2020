import React, { useState, useEffect } from 'react'
import {  useMutation, useSubscription, useLazyQuery } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR, BOOK_ADDED } from './queries'


const Authors = (props) => {
  
  const [authors, setAuthors] = useState([])
  const [getAuthors, result] = useLazyQuery(ALL_AUTHORS)

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS } ],
    onError: (error) => {
      console.log(error.message)
    }
  })

  
  const [newBDay, setNewBDay] = useState(0)
  const [selectedAuthor, setSelectedAuthor] = useState('')

  useSubscription(BOOK_ADDED, {
    onSubscriptionData : ({data})=> {
      getAuthors({fetchPolicy: 'network-only'})
    } 
  })

  useEffect(() => {    
    if(result.data){
      setAuthors(result.data.allAuthors)
    }    
  },[result]) //eslint-disable-line

  

  if (!props.show) {
    return null
  }
  if(!result.loading && !result.data){
    getAuthors()
  } 
  if(result.loading || !result.data){
    return <div>
      loading authors...
    </div>
  }
  
  
  const handleBirthday = async (event) => {
    event.preventDefault()
    editAuthor({ variables: { name: selectedAuthor, born: parseInt(newBDay)}})
    setNewBDay(0)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id+a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthday</h3>
      <form onSubmit={handleBirthday}>
        <select value={selectedAuthor} onChange={({target}) => setSelectedAuthor(target.value)}>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
        </select>
        <input value={newBDay} type='number' onChange={({target}) => setNewBDay(target.value)}>

        </input>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors

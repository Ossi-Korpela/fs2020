import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import phoneService from './services/puhelinluettelo'
import './index.css'




const RemoveButton = (props) => {
  const {person, removePerson} = props  
  return(
    <button onClick={() => removePerson(person)}>delete</button>
  )
}


const Display = (props) => {  
  let {persons, filterValue, removePerson} = props
  if(filterValue !== ''){
    persons = persons.filter(person => person.name.toLowerCase().match(filterValue.toLowerCase()))
  }
  
  return(
    <div>
      {persons.map( person => 
        <p key={person.id}>{person.name} {person.number} <RemoveButton 
                                                            person={person}
                                                            removePerson={removePerson}/> </p>
        )}
    </div>
  )

}

const Filter = (props) => {
  const handleFilterChange = props.handleFilterChange
  const filterValue = props.filterValue
  return(
    <form>
        <div>
          filter shown with <input value={filterValue}
                                   onChange = {handleFilterChange}/>
        </div>
      </form>
  )
}

const PersonForm = (props) => {
  const addPerson = props.addPerson
  const handlePersonChange = props.handlePersonChange
  const handleNumberChange = props.handleNumberChange
  const newName = props.newName
  const newNumber = props.newNumber
  

    return(
      <form onSubmit={addPerson}>
            <div>name: <input 
                      value={newName}
                      onChange={handlePersonChange}/>
            </div>
            <div>number: <input 
                            value={newNumber}
                            onChange={handleNumberChange}/>

            </div>
            <div>
              <button type="submit">add</button>
            </div>
          </form>
    )
}

const ErrorNotification = ({ message }) => {
  if (message === '') {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Notification = ({message}) => {
  if(message === null){
    return null
  }
  return(
    <div className="msg">
      {message}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterValue, setFilterValue] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    phoneService
      .getAll()
      .then(initialContacts => {
        setPersons(initialContacts)
      })
      .catch(error => {
        setErrorMessage(`unable to retrieve data from server`)
        setTimeout(() => {setErrorMessage('')}, 3000)
      }) 
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if(persons.filter(nam => nam.name === newName).length > 0){
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const oldPerson = persons.filter(nam => {return nam.name === newName})[0]
        const updatedPerson = {
          name : newName,
          number : newNumber,
          date : oldPerson.date,
          id : oldPerson.id
        }
        phoneService
          .update(oldPerson.id, updatedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(per => per.id !== oldPerson.id ? per : returnedPerson))
            setMessage(`Changed the number of ${oldPerson.name} succesfully`)
            setTimeout(() => {setMessage(null)}, 3000)

          })
          .catch(error => {
            setErrorMessage(`Information of ${oldPerson.name} has already been removed from the server`)
            setPersons(persons.filter(per => per.id !== oldPerson.id))
            setTimeout(() => {setErrorMessage('')}, 3000)
          }) 
        
      }            
    }
    else{

      //finding an alvailable id
      let i = 0
      const filt = () => {persons.filter(p => p.id === i)}
      while(filt.length > 0){
        i +=1
      }
      const nameObject = {
        name: newName,
        number: newNumber,
        date: new Date().toISOString(),
        id: i 
      }
      
      phoneService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessage(`Added ${nameObject.name}`)
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(error => {
          setErrorMessage(`Person ${newName} was already added`)
          setTimeout(() => {setErrorMessage('')}, 3000)
        })      
    }
    
    setNewName('')
    setNewNumber('')
  }

  const removePerson = person => {
    if(window.confirm(`delete ${person.name}?`)){
      phoneService
        .remove(person.id)
        .then(response => {
          setPersons(persons.filter(per => per.id !== person.id))
          setMessage(`Removed ${person.name}`)
          setTimeout(() => {setMessage(null)}, 3000)
        })
        .catch(error => {
          setErrorMessage(`Person ${newName} was already removed`)
          setPersons(persons.filter(per => per.id !== person.id))
          setTimeout(() => {setErrorMessage('')}, 3000)
        }) 
    }
  }  
  

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <Notification message={message}/>      
      <Filter handleFilterChange={handleFilterChange}
              filterValue = {filterValue}/>
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
        newNumber = {newNumber}
        newName = {newName}     
      />
      <h3>Numbers</h3>
      <Display persons={persons} 
               filterValue={filterValue}
               removePerson={removePerson}
               />
    </div>
  )

}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)

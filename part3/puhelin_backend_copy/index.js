require('dotenv').config()
const { response } = require('express')
const express = require('express')
const app = express()

const Contact = require('./models/contact')
const cors = require('cors')

app.use(cors())

const morgan = require('morgan')
morgan.token('post-data', function (req, res) {
    return(JSON.stringify(req.body))
})

app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))





app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res, next) => {
    Contact.find({}).then(persons => {
        res.status(200).json(persons)})
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    Contact.findById(req.params.id).then(contact => {
        res.json(contact)
    })
    .catch(error => next(error))

})

app.get('/info', (req, res, next) => {
    Contact.find({}).then(persons => {
        res.send(`<p>Phonebook has info for ${persons.length} people</p>
                <p>${Date()}`)})
    .catch(error => next(error))
    })



app.delete('/api/persons/:id', (req, res, next) => {
    Contact.findByIdAndRemove(req.params.id).then(
        result => {
            console.log('deleted')
            res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name : body.name,
        number : body.number,
        id : body.id
    }

    Contact.findByIdAndUpdate(req.params.id, person, { new : true })
        .then(updatedPerson => {
            res.json(updatedPerson)
        })
        .catch(error => next(error))
})


app.post('/api/persons', (req, res, next) => {
    const body = req.body
    console.log(body)
    if(!body){
        return res.status(400).json({
            error: 'request body missing'
        })
    }
    const person = new Contact({
        name : body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson =>  savedPerson.toJSON() )
        .then(formattedPerson => {
            return res.json(formattedPerson)
        })
        .catch(error => {next(error)})

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    if(error.name === 'CastError'){
        return res.status(400).send({ 'error' : 'malformatted id' })
    }
    if (error.name === 'ValidationError') {
        return res.status(400).json({
            error: error.message
        })
      }

    next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
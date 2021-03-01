
const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('conntecting to', url)
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true,
                        useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to mongoDB')
    })
    .catch((error) => {
        console.log('error connecting to db', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: { type: String,
            required: true,
            unique: true,
            minlength: 3 },
    number: { type: String,
             required: true,
             minlength: 8 }
})
contactSchema.plugin(uniqueValidator)

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
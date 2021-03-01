
const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log('give password')
    process.exit(1)
}
const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.n00nc.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useCreateIndex: true})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});


const Contact = mongoose.model('Contact',mongoose.Schema({
    name: String,
    number: String
}))


if(process.argv.length === 3){
    Contact.find().then(response => {
        console.log(response)
        mongoose.connection.close()
    })
   
}
console.log(process.argv.length)

if(process.argv.length !== 5){
    console.log('give only pword + number + name')
}
if(process.argv.length === 5){
    const new_name = process.argv[3]
    const new_num = process.argv[4]

    const new_person = new Contact({
        name: new_name,
        number: new_num
    })

    new_person.save().then(reponse => {
        console.log(`added ${new_name} number ${new_num} to phonebook`)
        mongoose.connection.close()
    })
}



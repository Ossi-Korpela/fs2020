const { ApolloServer, UserInputError, AuthenticationError, gql, PubSub } = require('apollo-server')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Book = require('./schemas/BookSchema')
const Author = require('./schemas/AuthorSchema')
const User = require('./schemas/UserSchema')

const pubsub = new PubSub()
const MONGODB_URI = 'mongodb+srv://fs2020:stack@cluster0.dzcnv.mongodb.net/library?retryWrites=true&w=majority'
const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'


console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch((error) => {
    console.log('error connecting to mongodb', error)
  })




const typeDefs = gql`
  type Book {
      title: String!
      published: Int!
      author: Author!
      id: ID!
      genres: [String!]!
  }

  type Author {
      name: String
      id: String
      born: Int
      bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(author: String, genre: String): [Book]
      allAuthors: [Author]
      me: User
  }

  type Mutation {
      addBook(
          title: String
          author: String
          published: Int
          genres: [String]
      ): Book
      editAuthor(
          name: String!
          setBornTo: Int!
      ): Author
      createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
  }
  type Subscription {
    bookAdded: Book!
  }

`

const resolvers = {
  Query: {
      bookCount: () => Book.collection.countDocuments(),
      authorCount: () => Author.collection.countDocuments(),
      allAuthors: () => Author.find({}),
      allBooks: async (root, args) => {
        let search = {}
        if(args.author){
          const author = Author.find({name: args.author})
          search = {author: author._id}
        }
        if(args.genre){
          search = {...search, genres: {$in: [args.genre]}}
        }
        console.log(search) 
        return Book.find(search).populate('author')      
        
      },
      me: (root, args, context) => {
        console.log(context.currentUser)
        return context.currentUser
      }
  },
  Author: {
      name: (root) => root.name,
      id: (root) => root.id,
      born: (root) => root.born,
      bookCount: async (root) => root.bookCount ? root.bookCount.length : 0
      
  },
  Mutation: {
      addBook: async (root, args, context) => {
        
        
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        const auth = await Author.findOne({name : args.author})
        
        let book = undefined
        if(!auth){
          const new_author = new Author({name: args.author, born: null})
          await new_author.save()
          book = new Book({...args, author: new_author})
        }
        else{
          book = new Book({...args, author: auth})
        }
        try{
          await book.save()
        }
        catch(error){
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }
        let author = await Author.findById(book.author)
        author.bookCount.push(book._id)
        await author.save()

        pubsub.publish('BOOK_ADDED', {bookAdded : book})
        return book         
      },

      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError("not authenticated")
        }
        const author = await Author.findOne({name: args.name})
        if(!author){
            return null
        }
        author.born = args.setBornTo
        try{
          author.save()
        }
        catch(error){
          throw new UserInputError(error.message, {invalidArgs: args})
        }
        return author
      },

      createUser: (root, args) => {
        const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
        console.log(args.favoriteGenre)

        return user.save()
          .catch(error => {
            throw new UserInputError(error.message, {
              invalidArgs: args,
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
    
        if (!user || args.password !== 'secret' ) {
          throw new UserInputError("incorrect credentials")
        }
    
        const userForToken = {
          username: user.username,
          id: user._id,
        }
    
        return { value: jwt.sign(userForToken, JWT_SECRET) }
      }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
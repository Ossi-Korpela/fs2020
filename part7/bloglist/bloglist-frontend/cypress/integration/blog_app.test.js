
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users', {
      username: 'testimies', name: 'paavo', password: 'salainen'
    })
    cy.visit('http://localhost:3000')
  })
  
    it('Login form is shown', function() {
      cy.contains('Login to application')
    })

    describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.get('#login-username').type('testimies')
        cy.get('#login-password').type('salainen')
        cy.get('#login-button').click()
        cy.contains('logged in')
      })
  
      it('fails with wrong credentials', function() {
        cy.get('#login-username').type('testimies')
        cy.get('#login-password').type('salainen2')
        cy.get('#login-button').click()
        cy.contains('wrong username or password')
      })

  })

})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedNoteappUser')).token}`
  }
  })

  cy.visit('http://localhost:3000')
})

describe('when logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: 'testimies',  name: 'paavo', password: 'salainen'
    }).then(response => {
      localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
    })
  })

  it('liking works', function() {              
    cy.createBlog({
      title : "testititle",
      author : "testiauthor", 
      url :"testiurl" 
    })  
    cy.visit('http://localhost:3000')
    cy.contains('view').click()
    cy.contains('like').click()
    cy.contains('1')
  })

  it('creator can remove blog', function() {    
    cy.visit('http://localhost:3000')
    cy.contains('view').click()
    cy.contains('remove').click()
    cy.contains('successfully')

  })

  it('blogs are sorted by likes', function() { 
    cy.createBlog({
      title : "testititle",
      author : "testiauthor", 
      url :"testiurl" 
    })     
    cy.createBlog({
      title : "testititle2",
      author : "testiauthor2", 
      url :"testiurl2",
    })
    
    
    cy.visit('http://localhost:3000')
    let likes = 0
    cy.contains('view').click()
    cy.contains('view').click()
    for(let i = 0; i < 10; i++){
      cy.get('.like-button').last().click()
      cy.wait(200)
    }
    cy.contains('5')
  })
})


// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', function ({ username, password }) {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, { username, password }).then(({ body }) => {
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('createBlog', function ({ title, author, url }) {
  cy.request({
    method: 'POST', 
    url: `${Cypress.env('BACKEND')}/blogs`,
    body : {title,author,url},
    headers : {
      'Authorization' : `Bearer ${JSON.parse(localStorage.getItem('loggedBlogUser')).token}`
    }
  })
  cy.visit('')

})
describe('Bloglist app',function(){
  let user
  let user2
  beforeEach(function(){
    cy.request('POST',`${Cypress.env('BACKEND')}/testing/reset`)
    user = {
      name : 'john test',
      username : 'johnusernametest',
      password : 'password'
    }
    user2  = {
      name : 'alanturing',
      username : 'alanturingtest',
      password : 'pasword'
    }
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user)
    cy.request('POST',`${Cypress.env('BACKEND')}/users`,user2)
    cy.visit('')
  })

  it('Login form shows up default',function(){
    cy.get('#login-form')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login',function(){
    it('Succeeds with correct credentials',function(){
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`Welcome ${user.name}`)

    })
    it('fails with wrong credentials',function(){
      cy.get('#username').type(user.username)
      cy.get('#password').type('wrong password')
      cy.get('#login-button').click()
      cy.wait(500)
      cy.get('.error')
        .should('contain','Wrong Credentials')
        .and('have.css','background-color','rgb(255, 0, 0)')
    })
  })

  describe('When Logged in',function(){
    beforeEach(function(){
      cy.login({username : user.username,password : user.password})
    })
    it('A blog can be created',function(){
      cy.contains('Create Blog').click()
      cy.get('.input-blog-title').type('my blog title')
      cy.get('.input-blog-author').type('denis')
      cy.get('.input-blog-url').type('www.google.com')
      cy.contains('Submit').click()
      
      cy.contains('my blog title')
      cy.contains('denis')
      cy.contains('www.google.com')
    })

    describe('And blog exist',function(){
      let blog
      beforeEach(function(){
        blog = {
          title : 'my new blog',
          author : 'riza suhardi',
          url : 'www.fb.com'
        }
        cy.createBlog(blog)
      })
      it('User can like blog',function(){
        cy.contains(blog.title).parent().parent().find('.show-button').as('showButton')
        cy.get('@showButton').click()
        cy.contains(blog.title).parent().parent().find('.like-button').as('likeButton')
        cy.get('@likeButton').click()
        cy.contains('Likes : 1')
      })

      it('User can delete blog',function(){
        cy.contains(blog.title).parent().parent().find('.show-button').as('showButton')
        cy.get('@showButton').click()
        cy.contains(blog.title).parent().parent().find('.delete-button').as('deleteButton')
        cy.get('@deleteButton').click()
        cy.on('window.confirm',(str)=>{
          expect(str).to.eq(`Delete ${blog.title} by ${blog.author}?`)
          return true
        })
        cy.contains(blog.title).should('not.exist')
      })

      it('only creator can see delete button',function(){
        cy.contains(blog.title).parent().parent().find('.show-button').as('showButton')
        cy.get('@showButton').click()
        cy.contains(blog.title).parent().parent().find('.delete-button').as('deleteButton')

        cy.login({username : user2.username,password : user2.password})
        cy.contains(blog.title).parent().parent().find('.show-button').as('showButton2')
        cy.get('@showButton2').click()
        cy.contains(blog.title).parent().parent().find('.delete-button').should('have.css','display','none')

      })

      it.only('The blog is sorted based on most like',function(){
        let blogs =[{
          title : 'Most like blog with total 5',
          author : '5 likes',
          url : 'www.fb.com'
        }
        ,{
          title : 'Second most like blog with total 2',
          author : '2 likes',
          url : 'www.fb.com' 
        }]
        for(let blog of blogs){
          cy.createBlog(blog)
        }
        cy.contains(blogs[0].title).parent().parent().find('.show-button').as('showButton')
        cy.get('@showButton').click()
        cy.contains(blogs[0].title).parent().parent().find('.like-button').as('likeButton')
        for(let i = 0;i<5;i++){
          cy.get('@likeButton').click()
          cy.wait(500)
        }

        cy.contains(blogs[1].title).parent().parent().find('.show-button').as('showButton2')
        cy.get('@showButton2').click()
        cy.contains(blogs[1].title).parent().parent().find('.like-button').as('likeButton2')
        for(let i = 0;i<2;i++){
          cy.get('@likeButton2').click()
          cy.wait(500)
        }
        cy.visit('')
        cy.get('.blog-title').eq(0).should('contain',blogs[0].title)
        cy.get('.blog-likes').eq(0).should('contain','Likes : 5')

        cy.get('.blog-title').eq(1).should('contain',blogs[1].title)
        cy.get('.blog-likes').eq(1).should('contain','Likes : 2')
        
        cy.get('.blog-title').eq(2).should('contain',blog.title)
        cy.get('.blog-likes').eq(2).should('contain','Likes : 0')


      })
    })

  })


})
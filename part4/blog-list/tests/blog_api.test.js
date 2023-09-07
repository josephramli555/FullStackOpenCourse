const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlog) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }

    //User initialize
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: "imnew", passwordHash })
    await user.save()
})

describe('Blog list test step  1, check GET BLOG', () => {
    test('blog returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blog', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlog.length)
    })
})


describe('Blog list test step 2', () => {
    test('blog contain property id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
})


describe('Blog list test step 3,POST BLOG', () => {
    let bearerToken = ''
    beforeEach(async () => {
        let newUser = {
            username: 'authentictest123',
            password: "testpassword"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        let user = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
        bearerToken = user.body.token
    })

    test('New blog can be added and saved in API.', async () => {
        let newBlog =
        {
            title: "New title for test",
            author: "New Author for test",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogAfterPost = await helper.blogInDb()

        const title = blogAfterPost.map(data => data.title)

        expect(blogAfterPost).toHaveLength(helper.initialBlog.length + 1)
        expect(title).toContain('New title for test')
    })

    test("Cannot add blog when token is not provided(Unauthorized)", async () => {
        let newBlog =
        {
            title: "New title for test",
            author: "New Author for test",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe("Blog list test step 4, check missing likes property", () => {
    test('If posting blog missing likes property, default the value to zero', async () => {
        let newUser = {
            username: 'authentictest123',
            password: "testpassword"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        let user = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
        let bearerToken = user.body.token

        let newBlog =
        {
            title: "Likes is zero",
            author: "Likes is zero",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const blog = response.body.filter((data) => { return data.title === 'Likes is zero' })
        expect(blog[0].likes).toBe(0)
    })
})

describe('Blog list step 5, reject post with missing title or url', () => {
    let bearerToken = ''
    beforeEach(async () => {
        let newUser = {
            username: 'authentictest123',
            password: "testpassword"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        let user = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
        bearerToken = user.body.token
    })

    test('reject with 400 status if title missing during post blog', async () => {
        let newBlog =
        {
            author: "Test 1",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 4
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(400)
    })
    test('reject with 400 status if url missing during post blog', async () => {
        let newBlog =
        {
            title: "Test 123",
            author: "Test 1",
            likes: 4
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(400)
    })
    test('reject with 400 status if url and title missing during post blog', async () => {
        let newBlog =
        {
            author: "Test 1",
            likes: 4
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(400)
    })
})

describe('Blog list expansion step 1, Delete Blog', () => {
    test('Deleting blog based on id', async () => {


        let newUser = {
            username: 'authentictest123',
            password: "testpassword"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        let user = await api
            .post('/api/login')
            .send(newUser)
            .expect(200)
        let bearerToken = user.body.token

        let blogSend = {
            title: "this blog gonna be deleted for test",
            url: "google.com"
        }
        let myBlog = await api
            .post('/api/blogs')
            .send(blogSend)
            .set("Authorization", `Bearer ${bearerToken}`)
        let idToDelete = myBlog.body.id
        const blogAtStart = await helper.blogInDb()
        const blogtoDelete = blogAtStart.filter(blog=>blog.id === idToDelete)[0]
        await api
            .delete(`/api/blogs/${blogtoDelete.id}`)
            .set("Authorization", `Bearer ${bearerToken}`)
            .expect(204)
        const blogAtEnd = await helper.blogInDb()

        expect(blogAtEnd).toHaveLength(blogAtStart.length - 1)

        const titles = blogAtEnd.map(blog => blog.title)
        expect(titles).not.toContain(blogtoDelete.title)

    })
})


describe('Blog list expansion step 2, Update blog', () => {
    test("Blog like number can be updated", async () => {
        const blogAtStart = await helper.blogInDb()
        const blogtoUpdate = blogAtStart[1]
        const updatedLikes = {
            likes: 12345
        }
        let updatedResult = await api
            .put(`/api/blogs/${blogtoUpdate.id}`)
            .send(updatedLikes)
            .expect(200)
        const blogAtEnd = await helper.blogInDb()
        expect(updatedResult.body.likes).toBe(12345)
        const likes = blogAtEnd.map(blog => blog.likes)
        expect(likes).toContain(12345)
    })
})

describe('Bloglist expansion step 4, create user and invalid user', () => {

    test('success create user with unique name', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'Deliva321',
            name: 'john123',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('non unique username will be rejected', async () => {
        let usersAtStart = await helper.usersInDb()
        let newUser = {
            username: 'imnew',
            password: 'test'
        }
        let result = await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
    test('password is required', async () => {
        let usersAtStart = await helper.usersInDb()
        let newUser = {
            username: "cindy",
            name: 'rudy'
        }
        let result = await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username: Path `password` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('password starts with minimum 3 character', async () => {
        let usersAtStart = await helper.usersInDb()
        let newUser = {
            username: "cindy",
            password: '23',
            name: 'rudy'
        }
        let result = await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `password` is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('username is required', async () => {
        let usersAtStart = await helper.usersInDb()
        let newUser = {
            password: "devil",
            name: 'rudy'
        }
        let result = await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username: Path `username` is required')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('username starts with minimum 3 character', async () => {
        let usersAtStart = await helper.usersInDb()
        let newUser = {
            username: "de",
            password: "devil",
            name: 'rudy'
        }
        let result = await api.post("/api/users")
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Path `username`')
        expect(result.body.error).toContain('is shorter than the minimum allowed length')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})


afterAll(async () => {
    await mongoose.connection.close()
})
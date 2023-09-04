const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Note = require('../models/blog')
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of helper.initialBlog) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
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
        console.log(response.body)
        expect(response.body[0].id).toBeDefined()
    })
})


describe('Blog list test step 3,POST BLOG', () => {
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
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogAfterPost = await helper.blogInDb()

        const title = blogAfterPost.map(data => data.title)

        expect(blogAfterPost).toHaveLength(helper.initialBlog.length + 1)
        expect(title).toContain('New title for test')
    })
})

describe("Blog list test step 4, check missing likes property", () => {
    test('If request missing likes property, default the value to zero', async () => {
        let newBlog =
        {
            title: "Likes is zero",
            author: "Likes is zero",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const response = await api.get('/api/blogs')
        const blog = response.body.filter((data) => { return data.title === 'Likes is zero' })
        expect(blog[0].likes).toBe(0)
    })
})

describe('Blog list step 5, reject post with missing title or url', () => {
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
            .expect(400)
    })
})

describe('Blog list expansion step 1, Delete Blog', () => {
    test('Deleting blog based on id', async () => {
        const blogAtStart = await helper.blogInDb()
        const blogtoDelete = blogAtStart[0]

        await api
            .delete(`/api/blogs/${blogtoDelete.id}`)
            .expect(204)
        const blogAtEnd = await helper.blogInDb()

        expect(blogAtEnd).toHaveLength(blogAtStart.length - 1)

        const titles = blogAtEnd.map(blog=>blog.title)
        expect(titles).not.toContain(blogtoDelete.title)

    })
})


describe('Blog list expansion step 2, Update blog',()=>{
    test("Blog like number can be updated",async()=>{
        const blogAtStart = await helper.blogInDb()
        const blogtoUpdate = blogAtStart[1]
        const updatedLikes = {
            likes : 12345
        }
        let updatedResult = await api
                .put(`/api/blogs/${blogtoUpdate.id}`)
                .send(updatedLikes)
                .expect(200)
        const blogAtEnd = await helper.blogInDb()
        expect(updatedResult.body.likes).toBe(12345)
        const likes = blogAtEnd.map(blog=>blog.likes)
        expect(likes).toContain(12345)
    })
})
afterAll(async () => {
    await mongoose.connection.close()
})
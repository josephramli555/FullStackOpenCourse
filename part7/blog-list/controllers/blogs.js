const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {userExtractor} = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
    try {
        let blog = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blog)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.post('/', userExtractor,async (request, response, next) => {
    try {
        const body = request.body
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }

        if (!body.hasOwnProperty('title') || !body.hasOwnProperty('url')) {
            response.status(400).end({ error: "title or url missing in request" })
        }

        const user = request.user
        const blog = new Blog({ ...body, user: user.id })
        if (!body.hasOwnProperty('likes')) {
            blog.likes = 0
        }

        let savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    } catch (exception) {
        next(exception)
    }
})

blogRouter.delete("/:id", async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({ error: 'token invalid' })
        }
        if (!request.params.id) {
            return response.status(400).json({ error: "deleted id missing" })
        }
        let blog = await Blog.findById(request.params.id)
        if(!blog){
            return response.status(404).json({error : "blog to delete not exist"})
        }
        if (blog.user.toString() == decodedToken.id) {
            await Blog.findByIdAndRemove(request.params.id)
        }else{
            return response.status(401).json({error : 'you cant delete another user blog'})
        }
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }

})

blogRouter.put('/:id', async (request, response,next) => {
    try {
        const { likes,user,author,title,url } = request.body
        const blog = {
            likes,user ,author,title,url
        }
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.json(updatedBlog)
    } catch (exception) {
        next(exception)
    }
})
module.exports = blogRouter
const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    let blog = await Blog.find({})
    response.json(blog)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    if (!body.hasOwnProperty('title') || !body.hasOwnProperty('url')) {
        response.status(400).end()
    }

    const blog = new Blog(body)
    if (!body.hasOwnProperty('likes')) {
        blog.likes = 0
    }
    let result = await blog.save()
    response.status(201).json(result)
})

blogRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const blog = {
        likes
    }
    const updatedBlog =await Blog.findByIdAndUpdate(request.params.id,blog,{new:true})
    response.json(updatedBlog)

})
module.exports = blogRouter
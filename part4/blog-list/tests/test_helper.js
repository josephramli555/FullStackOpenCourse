const Blog = require('../models/blog')

const initialBlog = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    }
]

const blogInDb = async ()=>{
    const blogs = await Blog.find({})
    return blogs.map(blog=>blog.toJSON())
}

module.exports = {
    initialBlog,blogInDb
}
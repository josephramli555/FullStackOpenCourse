const _ = require('lodash')
const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if (blogs.length === 0) {
        return 0
    }


    let result = blogs.reduce((accumulator, blog) => { return accumulator + blog.likes }, 0)
    return result
}

const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return {}
    }
    let favourite = {}
    blogs.forEach((blog, idx) => {
        let { title, author, likes } = blog
        if (idx === 0) {
            favourite = { title, author, likes }
        } else if (blog.likes > favourite.likes) {
            favourite = { title, author, likes }
        }
    })
    return favourite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    let authorBlog = blogs.map((blog) => {
        return blog.author
    })

    let authorObject = _.countBy(authorBlog)
    let authorMost = {
        author: "",
        blogs: Number.NEGATIVE_INFINITY
    }
    _.forEach(authorObject,function(value,key){
        if(value > authorMost.blogs){
            authorMost.author = key
            authorMost.blogs = value
        }
    })
    return authorMost
}


const mostLikes = (blogs) =>{
    if(blogs.length === 0){
        return {}
    }
    let authorLikes = {}
    blogs.forEach((blog)=>{
        if(!authorLikes.hasOwnProperty(blog.author)){
            authorLikes[blog.author] = blog.likes
        }else{
            authorLikes[blog.author] += blog.likes
        }
    })
    let mostLikeAuthor = {
        author: "",
        likes: Number.NEGATIVE_INFINITY
    }
    _.forEach(authorLikes,(totalLike,author)=>{
        if(totalLike > mostLikeAuthor.likes){
            mostLikeAuthor.author = author
            mostLikeAuthor.likes = totalLike
        }
    })
    return mostLikeAuthor
}

let a = [{author : 'a'},{author : 'a'},{author : 'a'},{author : 'b'}]
console.log(_.groupBy(a,a.author))

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
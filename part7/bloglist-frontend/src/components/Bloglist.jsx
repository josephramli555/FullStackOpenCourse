import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Blog from './Blog'
import LOGGED_USER_KEY from '../utils/utils'
import BlogService from '../services/blogs'
import { useState, useEffect } from 'react'

const BlogList = ({ blogs }) => {
  const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY)
  const user = JSON.parse(loggedUserJSON)
  let [bloglist, setBlogList] = useState(blogs)
  const deleteBlog = async (blog) => {
    let isDelete = confirm(`Delete ${blog.title} by ${blog.author}?`)
    if (isDelete) {
      try {
        await BlogService.deleteBlog(blog.id)
        let newBlogList = bloglist.filter(
          (currBlog) => blog.id !== currBlog.id
        )
        setBlogList(newBlogList)
      } catch (e) {
        console.log(e)
      }
    }
  }

  const updateLike = async (blog) => {
    let updatedBlog = {
      url: blog.url,
      author: blog.author,
      title: blog.title,
      id: blog.id,
      likes: blog.likes + 1,
      user: user.id,
    }
    return await BlogService.update(updatedBlog)
  }

  useEffect(() => {
    setBlogList(blogs)
  }, [blogs])

  return (
    <>
      <Container>
        <Row>
          {bloglist.map((blog,index) => (
            <Blog
              key={blog.id}
              data={blog}
              canBeDeleted={blog.user.username === user.username}
              handleDelete={() => {
                deleteBlog(blog)
              }}
              handleLike={async () => {
                let result = await updateLike(blog)
                let newBlogList = [...bloglist]
                newBlogList[index].likes = result.likes
                setBlogList(newBlogList)
                return result
              }}
            ></Blog>
          ))}
        </Row>
      </Container>
    </>
  )
}

export default BlogList

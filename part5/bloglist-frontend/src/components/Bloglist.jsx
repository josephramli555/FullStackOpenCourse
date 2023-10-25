import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Blog from "./Blog";
import LOGGED_USER_KEY from "../utils/utils";
import BlogService from "../services/blogs";
import { useState, useEffect } from "react";

const BlogList = ({ blogs }) => {
  const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY);
  const user = JSON.parse(loggedUserJSON);
  const [bloglist, setBlogList] = useState(blogs);
  const deleteBlog = async (blog) => {
    let isDelete = confirm(`Delete ${blog.title} by ${blog.author}?`);
    if (isDelete) {
      try {
        await BlogService.deleteBlog(blog.id);
      } catch (e) {
        console.log(e);
      }
    }
    let newBlogList = bloglist.filter((currBlog) => blog.id !== currBlog.id);
    setBlogList(newBlogList);
  };

  return (
    <>
      <Container>
        <Row>
          {bloglist.map((blog) => (
            <Blog
              key={blog.id}
              data={blog}
              canBeDeleted={blog.user.username === user.username}
              handleDelete={deleteBlog}
            ></Blog>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogList;

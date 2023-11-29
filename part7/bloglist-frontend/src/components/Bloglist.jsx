import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Blog from "./Blog";
import LOGGED_USER_KEY from "../utils/utils";
import BlogService from "../services/blogs";
import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const BlogList = ({ blogs }) => {
  const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY);
  const user = JSON.parse(loggedUserJSON);

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation({
    mutationFn: BlogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      let updatedBlogList = blogs.map((e) => {
        return e.id !== updatedBlog.id ? e : updatedBlog;
      });
      queryClient.setQueryData(["blogs"], updatedBlogList);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: BlogService.deleteBlog,
    onSuccess: (data,deleteBlogId) => {
      const blogs = queryClient.getQueryData(["blogs"])
      let newBlogList = blogs.filter((blog)=>{
        return blog.id !== deleteBlogId
      })
      queryClient.setQueryData(["blogs"], newBlogList);
    },
  });

  const deleteBlog = async (blog) => {
    let isDelete = confirm(`Delete ${blog.title} by ${blog.author}?`);
    if (isDelete) {
      deleteBlogMutation.mutate(blog.id);
    }
  };

  const updateLike = async (blog) => {
    let updatedBlog = {
      url: blog.url,
      author: blog.author,
      title: blog.title,
      id: blog.id,
      likes: blog.likes + 1,
      user: user.id,
    };
    updateBlogMutation.mutate(updatedBlog);
  };

  return (
    <>
      <Container>
        <Row>
          {blogs.map((blog, index) => (
            <Blog
              key={blog.id}
              data={blog}
              canBeDeleted={blog.user.username === user.username}
              handleDelete={() => {
                deleteBlog(blog);
              }}
              handleLike={async () => {
                await updateLike(blog);
              }}
            ></Blog>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default BlogList;

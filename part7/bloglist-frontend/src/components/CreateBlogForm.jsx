import { Fragment, useState } from "react";
import { Button, Form } from "react-bootstrap";
const CreateBlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogUrl, setBlogUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();
    let newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    };
    await createBlog(newBlog);
    setBlogTitle("");
    setBlogUrl("");
    setBlogAuthor("");
  };

  return (
    <>
      <Form onSubmit={addBlog} className="my-3">
        <Form.Group className="mb-2" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Blog Title"
            value={blogTitle}
            className="input-blog-title"
            onChange={({ target }) => {
              setBlogTitle(target.value);
            }}
            required
          ></Form.Control>
        </Form.Group> 
        <Form.Group className="mb-2" controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Blog Author"
            value={blogAuthor}
            onChange={({ target }) => {
              setBlogAuthor(target.value);
            }}
            className="input-blog-author"
          ></Form.Control>
        </Form.Group>
        <Form.Group className="mb-2" controlId="url">
          <Form.Label>Blog URL</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Blog Url"
            value={blogUrl}
            onChange={({ target }) => {
              setBlogUrl(target.value);
            }}
            className="input-blog-url"
            required
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit" className="my-2">
          submit
        </Button>
      </Form>
    </>
  );
};

export default CreateBlogForm;

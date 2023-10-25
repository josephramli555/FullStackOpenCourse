import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import BlogService from "../services/blogs";

const Blog = (props) => {
  let { url, likes, author, title, id, user } = props.data;
  let { canBeDeleted, handleDelete } = props;
  const [visible, setVisible] = useState(false);
  const [totalLikes, setTotalLikes] = useState(likes);

  const showWhenVisible = { display: visible ? "" : "none" };
  const showButtonTitle = visible ? "Hide" : "View";

  const showButtonDelete = { display: canBeDeleted ? "" : "none" };
  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const updateLike = async () => {
    let updatedBlog = {
      url,
      author,
      title,
      id,
      likes: likes + 1,
      user: user.id,
    };
    let result = await BlogService.update(updatedBlog);
    setTotalLikes(result.likes);
  };



  return (
    <Col xs={12} md={6} xl={4} className="mb-3">
      <Card style={{ width: "18rem" }} key={id}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button variant="success" onClick={toggleVisibility}>
            {showButtonTitle}
          </Button>
        </Card.Body>
        <ListGroup className="list-group-flush" style={showWhenVisible}>
          <ListGroup.Item>url : {url}</ListGroup.Item>
          <ListGroup.Item>Likes : {totalLikes} </ListGroup.Item>
          <ListGroup.Item>Author : {author}</ListGroup.Item>
          <ListGroup.Item>User : {user.name}</ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="success"
              onClick={() => {
                updateLike();
              }}
            >
              Like
            </Button>
            <Button
              style={showButtonDelete}
              variant="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Col>
  );
};

export default Blog;

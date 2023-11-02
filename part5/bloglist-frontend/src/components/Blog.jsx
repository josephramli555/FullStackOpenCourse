import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'

const Blog = (props) => {
  let { url, likes, author, title, id, user } = props.data
  let { canBeDeleted, handleDelete, handleLike } = props
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const showButtonTitle = visible ? 'Hide' : 'View'

  const showButtonDelete = { display: canBeDeleted ? '' : 'none' }
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <Col xs={12} md={6} xl={4} className="mb-3">
      <Card style={{ width: '18rem' }} key={id}>
        <Card.Body>
          <Card.Title>
            {title} by {author}
          </Card.Title>
          <Button variant="success" onClick={toggleVisibility}>
            {showButtonTitle}
          </Button>
        </Card.Body>
        <ListGroup
          className="list-group-flush blog-details"
          style={showWhenVisible}
        >
          <ListGroup.Item>Url : {url}</ListGroup.Item>
          <ListGroup.Item>Likes : {likes} </ListGroup.Item>
          <ListGroup.Item>User : {user.name}</ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="success"
              onClick={async () => {
                await handleLike()
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
  )
}

export default Blog

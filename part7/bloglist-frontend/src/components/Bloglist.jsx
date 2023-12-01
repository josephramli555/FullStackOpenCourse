
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
const BlogList = ({ blogs }) => {

  return (
    <>
      {blogs.map(({ author, title, id }) => {
        return (
          <Card
            key={id}
            border="warning"
            style={{ margin: "10px" }}
            className="text-center"
            bg="light"
          >
            <Card.Body>
              <Link to={`blogs/${id}`}>
              {title} by {author} 
              </Link>
            </Card.Body>
          </Card>
        );
      })}
    </>
  );

};

export default BlogList;

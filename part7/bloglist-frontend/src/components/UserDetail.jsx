import { useQueryClient } from "@tanstack/react-query";
import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
const UserDetail = () => {
  let queryClient = useQueryClient();
  let userList = queryClient.getQueryData(["users"]);
  if (!userList) {
    return <h2>Can't load user data</h2>;
  }
  const id = useParams().id;
  const user = userList.find((e) => e.id === id);
  console.log(user);

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>Added blogs</h2>
      <ListGroup>
        {user.blogs.map((blog) => {
          return <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>;
        })}
      </ListGroup>
    </div>
  );
};

export default UserDetail;

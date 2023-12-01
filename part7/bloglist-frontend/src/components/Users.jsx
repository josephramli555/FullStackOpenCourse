import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import userService from "../services/user";
const Users = () => {
  let result = useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
  if (result.isLoading) {
    return <div>Loading users data</div>;
  }
  let users = [...result.data];
 
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>No</th>
            <th>Users</th>
            <th>Blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => {
            return (
              <tr key={user.username}>
                <td>{idx}</td>
                <td>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Users;

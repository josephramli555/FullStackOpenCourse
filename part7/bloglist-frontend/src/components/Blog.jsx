
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useQueryClient ,useMutation} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import blogService from "../services/blogs";
import { useNotifDispatch, useUserValue } from "../context/AppContext";
import { createSuccessNotif } from "../reducers/notification";
const Blog = () => {
  const user = useUserValue()
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const dispatchNotif = useNotifDispatch()
  let blogList = queryClient.getQueryData(["blogs"]);


  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      let updatedBlogList = blogs.map((e) => {
        return e.id !== updatedBlog.id ? e : updatedBlog;
      });
      queryClient.setQueryData(["blogs"], updatedBlogList);
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (data, deleteBlogId) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      let newBlogList = blogs.filter((blog) => {
        return blog.id !== deleteBlogId;
      });
      queryClient.setQueryData(["blogs"], newBlogList);
    },
  });

  const handleDelete = async (blog) => {
    let isDelete = confirm(`Delete ${blog.title} by ${blog.author}?`);
    if (isDelete) {
      deleteBlogMutation.mutate(blog.id);
      dispatchNotif(createSuccessNotif(`${blog.title} by ${blog.author} has been deleted`))
      setTimeout(() => {
        dispatchNotif(createSuccessNotif(null));
      }, 5000);
      navigate('/') 
    }
  };

  const handleLike = async (blog) => {
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
  let blogId = useParams().id;
  let blog = blogList.find((e) => e.id === blogId);
  let { url, likes, author, title} = blog;

  const showButtonDelete = { display: user.username ===blog.user.username ? "" : "none" };


  return (
    <Card className="text-center" bg="light" border="warning">
      <Card.Header className="display-6 font-weight-bold bg-dark text-light  text-uppercase py-3">{title}</Card.Header>
      <Card.Body className="py-4">
        <Card.Title className="blockquote-footer">
          Written by <cite title={author}>{author}</cite>
        </Card.Title>
        <Card.Text>
          <a href={url}>Source : {url}</a>
        </Card.Text>
        <Card.Text>Likes : {likes}</Card.Text>
        <Button
          variant="success"
          className="mx-2"
          onClick={async () => {
            await handleLike(blog);
          }}
        >
          Like
        </Button>
        <Button
          variant="danger"
          style={showButtonDelete}
          onClick={async () => {
            await handleDelete(blog);
          }}
        >
          Delete
        </Button>
      </Card.Body>
      <Card.Footer className="text-muted">Added by {user.name}</Card.Footer>
    </Card>
  );
 
};

export default Blog;

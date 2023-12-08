import { Button, Card, Container, Form } from "react-bootstrap";
import { useState } from "react";
import blogService from "../services/blogs";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { useNotifDispatch } from "../context/AppContext";
import { createSuccessNotif } from "../reducers/notification";
const Comments = ({blog}) => {
  let {comments , id : blogID} = blog
  const [blogComment, setBlogComment] = useState("");
  const queryClient = useQueryClient();
  const notifDispatch = useNotifDispatch()
  const postCommentMutation = useMutation({
    mutationFn: blogService.postComment,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      const newBlogList = blogs.map(blog=>{
        if(blog.id === newBlog.id){
          blog.comments=newBlog.comments
        }
          return blog
      })
      queryClient.setQueryData(["blogs"], [...newBlogList]);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(blogComment.length==0){
      return
    }
    postCommentMutation.mutate({blogID,content : blogComment},{
      onSuccess: (data) => {
        notifDispatch(
          createSuccessNotif(
            `comment has been added`
          )
        );
        setTimeout(() => {
          notifDispatch(createSuccessNotif(null));
        }, 3000);
      },
    })
    setBlogComment('')
  };


  return (
    <Container>
      <h1>Comments</h1>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write your comment"
            value={blogComment}
            onChange={({ target }) => {
              setBlogComment(target.value)
            }}
          />
        </Form.Group>
        <Button type="submit">Post Comment</Button>
      </Form>

      {comments.length==0 ? null : comments.map((comment, idx) => (
        <Card className="my-3" border="info" bg="light" text="black" key={idx}>
          <Card.Body>
            <Card.Text>{comment}</Card.Text>
          </Card.Body>
        </Card>
      ))}       
      
    </Container>
  );
};

export default Comments;

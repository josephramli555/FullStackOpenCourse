import "./index.css";
import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/Bloglist";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LOGGED_USER_KEY from "./utils/utils";
import Notification from "./components/Notification";
import Users from "./components/Users";
import {
  useNotifDispatch,
  useUserDispatch,
  useUserValue,
} from "./context/AppContext";
import { setUser, logoutUser } from "./reducers/user";
import { createAlertNotif, createSuccessNotif } from "./reducers/notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserDetail from "./components/UserDetail";
import Blog from "./components/Blog";
import { Container } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const notifDispatch = useNotifDispatch();
  const userDispatch = useUserDispatch();
  const queryClient = useQueryClient();
  const user = useUserValue();
  let blogs;
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY);
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      userDispatch(setUser(parsedUser));
      blogService.setToken(parsedUser.token);
    }
  }, []);
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(["blogs"]);
      queryClient.setQueryData(["blogs"], blogs.concat(newBlog));
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userLogin = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(userLogin));
      userDispatch(setUser(userLogin));
      blogService.setToken(userLogin.token);
      setUsername("");
      setPassword("");
    } catch (exception) {
      notifDispatch(createAlertNotif("Wrong credentials has been entered"));
      setTimeout(() => {
        notifDispatch(createSuccessNotif(null));
      }, 5000);
    }
  };

  const createBlog = async (blog) => {
    try {
      newBlogMutation.mutate(blog, {
        onSuccess: (data) => {
          notifDispatch(
            createSuccessNotif(
              `${data.title} by ${data.author} has been created`
            )
          );
          setTimeout(() => {
            notifDispatch(createSuccessNotif(null));
          }, 3000);
        },
      });
    } catch (exception) {
      console.log(exception);
      notifDispatch(createAlertNotif("Submission Error"));
      setTimeout(() => {
        notifDispatch(createSuccessNotif(null));
      }, 3000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem(LOGGED_USER_KEY);
    userDispatch(logoutUser());
  };

  const HeaderLogin = ({ handleLogout }) => {
    return (
      <div>
        <h1>Welcome to Main Page 
      
        </h1>
        <h2>{user.name}</h2>
        <br></br>
      </div>
    );
  };

  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });

  if (result.isLoading) {
    return <div>Loading blog data</div>;
  }
  blogs = [...result.data];
  blogs.sort((a, b) => {
    return b.likes - a.likes;
  });

  if (!user) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        password={password}
        username={username}
        handlePasswordChange={({ target }) => {
          setPassword(target.value);
        }}
        handleUsernameChange={({ target }) => {
          setUsername(target.value);
        }}
      />
    );
  }

  return (
    <Router>
      <Container>
      <NavigationBar handleLogout={handleLogout} />
      <Notification />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <HeaderLogin handleLogout={handleLogout} />
                <Togglable buttonLabel="Create Blog">
                  <CreateBlogForm createBlog={createBlog}></CreateBlogForm>
                </Togglable>
                <BlogList blogs={blogs} />
              </div>
            }
          />
          <Route path="/blogs/:id" element={<Blog />}></Route>
          <Route path="/users/:id" element={<UserDetail />}></Route>
          <Route path="/users" element={<Users />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;

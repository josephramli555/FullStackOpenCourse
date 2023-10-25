import "./index.css";
import { useState, useEffect } from "react";


import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm";
import Togglable from "./components/Togglable";
import BlogList from "./components/Bloglist";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LOGGED_USER_KEY from "./utils/utils"

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER_KEY);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService.getAll().then((fetchBlog) => {
        // Sort Blog By Likes
        fetchBlog.sort((a,b)=>{return b.likes-a.likes})
        setBlogs(fetchBlog);
      });
    }
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      const fetchBlog = await blogService.getAll();
      setBlogs(fetchBlog);
      window.localStorage.setItem(LOGGED_USER_KEY, JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotifMessage("Wrong Credentials");
      setIsError(true);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    }
  };

  const createBlog = async (blog) => {
    try {
      let newBlog = await blogService.create(blog);
      let fetchBlog = await blogService.getAll();
      setBlogs(fetchBlog);
      setNotifMessage(`${newBlog.title} by ${newBlog.author} has been created`);
      setIsError(false);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    } catch (exception) {
      setNotifMessage(`Submission error`);
      setIsError(true);
      setTimeout(() => {
        setNotifMessage(null);
      }, 3000);
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    window.localStorage.removeItem(LOGGED_USER_KEY);
    setUser(null);
  };

  const HeaderLogin = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>Welcome {user.name}</p>
        <button onClick={handleLogout}>Logout</button>
        <br></br>
      </div>
    );
  };



  const notifPopUp = () => {
    if (notifMessage === null) {
      return null;
    }
    let className = isError ? "error" : "success";
    return <div className={className}>{notifMessage}</div>;
  };

  return (
    <div>
      <h2>Welcome to Website</h2>
      {notifPopUp()}
      {user ? (
        <div>
          <HeaderLogin />
          <Togglable buttonLabel="Create Blog">
            <CreateBlogForm createBlog={createBlog}></CreateBlogForm>
          </Togglable>
          <BlogList blogs={blogs}/>
        </div>
      ) : (
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
      )}
    </div>
  );
};

export default App;

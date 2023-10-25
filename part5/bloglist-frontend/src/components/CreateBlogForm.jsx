import { useState } from "react";

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
    await createBlog(newBlog)
    setBlogTitle("")
    setBlogUrl("")
    setBlogAuthor("")
  };

  return (
    <>
      <h2>Create Form</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => {
              setBlogTitle(target.value);
            }}
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => {
              setBlogAuthor(target.value);
            }}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            onChange={({ target }) => {
              setBlogUrl(target.value);
            }}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateBlogForm;

import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    let newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }
    await createBlog(newBlog)
    setBlogTitle('')
    setBlogUrl('')
    setBlogAuthor('')
  }

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
            placeholder='write blog title here'
            onChange={({ target }) => {
              setBlogTitle(target.value)
            }}
            className='input-blog-title'
            required
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            placeholder='write blog author here'
            onChange={({ target }) => {
              setBlogAuthor(target.value)
            }}
            className='input-blog-author'
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={blogUrl}
            name="Url"
            placeholder='write blog url here'
            onChange={({ target }) => {
              setBlogUrl(target.value)
            }}
            required
            className='input-blog-url'
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default CreateBlogForm

import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (blog) => {
  const updateUrl = baseUrl + '/' + blog.id
  const request = axios.put(updateUrl, blog)
  return request.then(response => response.data)
}

const deleteBlog = (blogID) => {
  const deleteURL = `${baseUrl}/${blogID}`
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(deleteURL,config)
  return request.then(response => response.data)
}

export default { getAll, setToken, create, update, deleteBlog }
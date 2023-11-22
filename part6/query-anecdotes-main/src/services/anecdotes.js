import axios from 'axios'

const BASEURL = "http://localhost:3001/anecdotes"

export const  getAllAnecdote = async()=>{
    let result = await axios.get(BASEURL)
    return result.data
}

export const createAnecdote = async(anecdote)=>{
    let result = await axios.post(BASEURL,anecdote)
    return result.data
}

export const updateAnecdote = async(updatedAnecdote)=>{
    let result = await axios.put(`${BASEURL}/${updatedAnecdote.id}`,updatedAnecdote)
    return result.data
}
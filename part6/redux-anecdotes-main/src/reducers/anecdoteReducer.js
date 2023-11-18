import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState : [],
  reducers: {
    voteAnecdote(state, action) {
      const id = action.payload
      return state.map((anecdote) => {
        return anecdote.id !== id ? anecdote : { ...anecdote, votes: anecdote.votes + 1 }
      })
    },
    setAnecdote(state,action){
      return action.payload
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    }
  }
})

export const { setAnecdote,appendAnecdote} = anecdoteSlice.actions


export const voteAnecdote = (id)=>{
  return async(dispatch,getState)=>{
    const currAnecddotes = getState().anecdotes
    const updateAnecdote = {...currAnecddotes.find((e)=>e.id === id)}
    updateAnecdote.votes +=1
    await anecdoteService.update(id,updateAnecdote)
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}


export const initializeAnecdote = ()=>{
  return async(dispatch)=>{
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes)) 
  }
}

export const createAnecdote = (content)=>{
  return async(dispatch)=>{
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  } 
}

export default anecdoteSlice.reducer
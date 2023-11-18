import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/Anecdotelist'
import Notification from './components/Notification'
import Filter from './components/Filter'
import {initializeAnecdote} from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
const App = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(initializeAnecdote())
  },[])

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App
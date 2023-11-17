import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/Anecdotelist'
import Notification from './components/Notification'
import Filter from './components/Filter'
const App = () => {

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
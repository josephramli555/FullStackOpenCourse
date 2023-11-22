import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import {useQueryClient,useQuery} from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { getAllAnecdote,updateAnecdote } from './services/anecdotes'
import { useNotifDispatch,setNotif } from './NotificationContext'
const App = () => {
  const dispatchNotif = useNotifDispatch()
  const queryClient = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess : (newAnecdote)=>{
      console.log("New anecdote after vote",newAnecdote)
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      const updateAnecdoteList = anecdotes.map((currAnecdote)=>{
        return currAnecdote.id !== newAnecdote.id ? currAnecdote : newAnecdote 
      })
      queryClient.setQueryData(['anecdotes'],updateAnecdoteList)
    }
  });

  const result = useQuery({
    queryKey : ['anecdotes'],
    queryFn : getAllAnecdote,
    retry : 1
  })

  const handleVote = (anecdote) => {
    let updatedAnecdote = {...anecdote,votes : anecdote.votes+1}
    updateAnecdoteMutation.mutate(updatedAnecdote)
    dispatchNotif(setNotif(`${anecdote.content.slice(0,40)}.... has been voted`))
    setTimeout(()=>{
      dispatchNotif(setNotif(''))
    },5000)
  }

  if(result.isLoading){
    return <div>Loading Data....</div>
  }

  if(result.isError){
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import { useNotifDispatch,setNotif } from "../NotificationContext";
const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatchNotif = useNotifDispatch()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess : (newAnecdote)=>{
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'],anecdotes.concat([newAnecdote]))

    },
    onError : ()=>{
      dispatchNotif(setNotif("TOO SHORT ANECDOTE,MUST HAVE length 5 or more"))
      setTimeout(()=>{
        dispatchNotif(setNotif(''))
      },3000)
    }
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    let newAnecdote = {content,votes : 0}
    newAnecdoteMutation.mutate(newAnecdote);
    dispatchNotif(setNotif(`${content.slice(0,40)}.... has been added`))
    setTimeout(()=>{
      dispatchNotif(setNotif(''))
    },5000)
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;

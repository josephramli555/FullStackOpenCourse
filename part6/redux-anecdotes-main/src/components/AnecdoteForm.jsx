import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotifText } from "../reducers/notificationReducer";
const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotifText(`You added ${content.slice(0,15)}... into list`))
        setTimeout(()=>{
            dispatch(setNotifText(''))
        },5000)
    }
    return (
        <>
        <h2>Create Anecdote</h2>
         <form onSubmit={addAnecdote}>
            <div><input name="anecdote" /></div>
            <button type="submit">create</button>
        </form>
        </>
       
    )
}

export default AnecdoteForm
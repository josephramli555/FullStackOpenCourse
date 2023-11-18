import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
const AnecdoteList = () => {
  const sortedAnecdotes = useSelector(({ anecdotes, filter }) => {
    let currAnecdotes = [...anecdotes];
    currAnecdotes = currAnecdotes.sort((a, b) => {
      return b.votes - a.votes;
    });
    if (filter === "") {
      return currAnecdotes;
    } else {
      return currAnecdotes.filter((anecdote) => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase());
      });
    }
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
    let content = sortedAnecdotes.find((e) => e.id == id).content;
    dispatch(setNotification(`You have voted ${content.slice(0, 15)}...`,5));
  };

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;

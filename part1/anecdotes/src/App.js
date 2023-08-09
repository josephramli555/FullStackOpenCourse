import {useState} from 'react'
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [totalVote,setTotalVote] = useState([0,0,0,0,0,0,0,0])
  const [idxMostVote,setIdxMostVote] = useState(0)

  const nextAnecdote=()=>{
    setSelected(Math.floor(Math.random()*8))
  }
  const setVote=()=>{
    const newVotes = [...totalVote]
    newVotes[selected]+=1
    setTotalVote(newVotes)

    let bigVote = newVotes[0]
    let idxBigVote = 0;
    for(let i = 1; i<newVotes.length;i++){
      if(newVotes[i]>bigVote){
        bigVote = newVotes[i]
        idxBigVote = i
      }
    }
    setIdxMostVote(idxBigVote)
  }
   
  return (
    <div>
      <h1>Anecdotes of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>{totalVote[selected]}</p>
      <button onClick={setVote}>Vote</button>
      <button onClick={nextAnecdote}>Next Anecdotes</button>
      <h1>Anecdotes With Most Votes</h1>
      <p>{anecdotes[idxMostVote]}</p>
      <p>has {totalVote[idxMostVote]} votes</p>
    </div>
  )
}

export default App;

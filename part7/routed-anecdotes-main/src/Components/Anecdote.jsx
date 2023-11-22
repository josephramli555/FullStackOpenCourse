const Anecdote = ({anecdote})=>{
    console.log(anecdote)
    let {content,author,info,votes} = anecdote
    return(
      <div>
        <h2>{content}</h2>
        <h2>Author : {author}</h2>
        <h2>Info :{info}</h2>
        <h2>Votes : {votes}</h2>
      </div>
    )
  }

  export default Anecdote
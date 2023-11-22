import { useState } from "react";
import {Routes, Route, useMatch  } from "react-router-dom";
import AnecdoteList from "./Components/AnecdoteList";
import Footer from "./Components/Footer";
import Menu from "./Components/Menu";
import About from "./Components/About";
import Anecdote from "./Components/Anecdote";
import CreateNew from "./Components/CreateNew";
import Notification from "./Components/Notification";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} has been added`)
    setTimeout(()=>{
      setNotification('')
    },5000)
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const match = useMatch("/anecdotes/:id");

  const anecdote = match
    ? anecdotes.find((e) => {
        return e.id === Number(match.params.id);
      })
    : null;
  return (
    <div>
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu />
      <Routes>
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/about" element={<About />} />
        <Route path="/create" element={<CreateNew addNew={addNew} />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;

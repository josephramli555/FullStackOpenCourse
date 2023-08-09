const Header = (props) => {
  return (
    <>
      <h1>
        {props.course.name}
      </h1>
    </>
  )
}


const Part = (props)=>{
  const {exercises,name} = props
  return(
    <p>
      {name} {exercises}
    </p>
  )
}
const Content = (props) => {
  const part1 = props.parts[0]
  const part2 = props.parts[1]
  const part3 = props.parts[2]
  return (
    <>
    <Part name = {part1.name} exercises={part1.exercises}/>
    <Part name = {part2.name} exercises={part2.exercises}/>
    <Part name = {part3.name} exercises={part3.exercises}/>
    </>
  )
}

const Total = (props) => {
  const exercises1 = props.parts[0].exercises
  const exercises2 = props.parts[1].exercises
  const exercises3 = props.parts[2].exercises
  return (
    <>
      <p>Number of exercises{exercises1 + exercises2 + exercises3}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts}  />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
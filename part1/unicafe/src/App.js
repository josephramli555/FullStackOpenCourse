import { useState } from "react";

const Button = ({handleClick,text}) =>{
  return(
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text,value})=>{
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({goodVal,neutralVal,badVal,allVal,averageVal,posPercentageVal}) =>{
  
  return allVal===0 ? <h1>No feedback given </h1> : 
    <>
    <h1>Statistics</h1>
    <table>
      <StatisticLine text='good' value={goodVal}/>
      <StatisticLine text='neutral' value={neutralVal}/>
      <StatisticLine text='bad' value={badVal}/>
      <StatisticLine text='all' value={allVal}/>
      <StatisticLine text='average' value={averageVal}/>
      <StatisticLine text='positive' value={posPercentageVal}/>
    </table>
    </>
 
}

const App = ()=>{
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)
  const [all,setAll] = useState(0)
  const [average,setAverage] = useState(0)
  const [posPercentage,setPosPercentage] = useState(0)
  


  const handleGoodClick=()=>{
    const updatedGood = good+1
    setGood(updatedGood)
    const updatedAll = updatedGood+neutral+bad
    setAll(updatedAll)
    const updatedAverage = ((updatedGood*1)+(bad*-1))/updatedAll
    setAverage(updatedAverage)
    const newPercentage = ((updatedGood)/(updatedAll))*100
    setPosPercentage(newPercentage+' %')
  }

  const handleNeutralClick=()=>{
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    const updatedAll = updatedNeutral+good+bad
    setAll(updatedAll)
    const updatedAverage = ((good*1)+(bad*-1))/updatedAll
    setAverage(updatedAverage)
    const newPercentage = ((good)/(updatedAll))*100
    setPosPercentage(newPercentage+' %')
  } 

  const handleBadClick=()=>{
    const updatedBad = bad +1
    setBad(updatedBad)
    const updatedAll = updatedBad+good+neutral
    setAll(updatedAll)
    const updatedAverage = ((good*1)+(updatedBad*-1))/updatedAll
    setAverage(updatedAverage)
    const newPercentage = ((good)/(updatedAll))*100
    setPosPercentage(newPercentage+' %')
  }
  

  return(
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='good'/>
      <Button handleClick={handleNeutralClick} text='neutral'/>
      <Button handleClick={handleBadClick} text='bad'/>
      
     <Statistics
      goodVal={good}
      badVal={bad}
      neutralVal={neutral}
      allVal={all}
      averageVal={average}
      posPercentageVal={posPercentage}
     />

    </div>
  )
}

export default App;
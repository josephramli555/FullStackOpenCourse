import './index.css'
import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import PersonList from './components/PersonList'
import PersonService from './services/persons'
import Notification from './components/Notification'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [filterName, setFilterName] = useState('')
  const [filterList, setFilterList] = useState([])
  const [isFilter, setIsFilter] = useState(false)
  const [successNotif,setSuccessNotif] = useState(null)
  const [errorNotif,setErrorNotif] = useState(null)
  useEffect(() => {
    console.log("Effect work")
    PersonService
      .getAll()
      .then(data => {
        console.log("data dari get all adalah", data)
        setPersons(data)
      })
      .catch(error=>{
        console.log(error)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    //check Duplicate Name case insensitive
    let nameArr = persons.map(person => person.name.toLowerCase())
    let personIdx = nameArr.indexOf(newName.toLowerCase()) 
    if (personIdx !== -1) {
      let isUpdate = window.confirm(`${newName} is already in the phonebook, replace old number with new one?`)
      
      if(isUpdate){
        const persontoUpdate = persons[personIdx]
        const newPerson  = {...persontoUpdate,number: phoneNum}
        const id = persons[personIdx].id
        PersonService
          .updatePerson(id,newPerson)
          .then(updatedPerson=>{
            setPersons(persons.map(person=>person.id !== id ? person : updatedPerson))
          })
          .catch((error)=>{
            console.log(error)
            setErrorNotif(
              `Information of ${newName} has already been removed from server`
            )
            setPersons(persons.filter(person=>person.id!==id))
            setTimeout(()=>{
              setErrorNotif(null)
            },3000)
          })
      }
      
      return
    }
    //Find the highest id of all person
    let maxId = persons.reduce((acc, curr) => (Math.max(acc, curr)), Number.MIN_VALUE)
    let newPerson = {
      name: newName, id: maxId + 1, number: phoneNum
    }

    PersonService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setPhoneNum('')
        setSuccessNotif(
          `Person ${data.name} successfully added to phonebook`
        )
        setTimeout(()=>{
          setSuccessNotif(null)
        },5000)
      })
      .catch(error=>{
        console.log(error)
      })
  }

  const deletePerson = (event) => {
    const personName = persons.filter(person => person.id === Number(event.target.value))[0].name
    console.log(personName)
    const isDelete = window.confirm(`Are you sure to delete ${personName}?`)
    if (isDelete) {
      PersonService
        .deletePerson(event.target.value)
        .then(data => {
          return PersonService.getAll()
        })
        .then(data => {
          setPersons(data)
        })
        .catch(error=>{
          console.log(error)
        })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handlePhoneChange = (event) => {
    setPhoneNum(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
    //if filtered string is not empty
    let searchName = event.target.value
    if (event.target.value) {
      setIsFilter(true)
      let filtered =
        persons.filter(person => person.name.toLowerCase().startsWith(searchName.toLowerCase())).map(data => { return ({ ...data, id: 'Filter' + data.id }) })
      setFilterList(filtered)
    } else {
      setIsFilter(false)
      setFilterList([])
    }
  }

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={successNotif} iserror={false}/>
      <Notification message={errorNotif} iserror={true}/>
      <FilterForm onSubmit={(e) => { e.preventDefault() }}
        value={filterName}
        onChange={handleFilterChange}
      />
      <h1>Add New Person</h1>
      <PersonForm onSubmit={addPerson}
        handleNameChange={handleNameChange}
        handlePhoneChange={handlePhoneChange}
        phoneNumber={phoneNum}
        personName={newName} />
      <ul>
        {
          isFilter
            ?
            filterList.map(({ id, name, number }) => <PersonList key={id} name={name} number={number} />)
            :
            (persons.length > 0 ?
              persons.map(
                ({ id, name, number }) =>
                  <PersonList name={name} number={number} key={id} id={id} handledelete={deletePerson} />
              )
              :
              <h1>List Empty</h1>)
        }
      </ul>
    </>
  )
}

export default App
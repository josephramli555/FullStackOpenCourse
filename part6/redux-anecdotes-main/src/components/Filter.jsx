import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"
const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
      event.preventDefault()
      let filter = event.target.value
      dispatch(setFilter(filter))  
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} name="filter"/>
      </div>
    )
  }
  
  export default Filter
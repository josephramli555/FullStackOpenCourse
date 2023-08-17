const PersonList = ({name,number,id,handledelete})=>{
    return(
        <li>{name} {number} <button type='button' onClick={handledelete} value={id}>Delete</button></li>
        

    )

}
export default PersonList;
const PersonForm = ({personName,handleNameChange,phoneNumber,handlePhoneChange,onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>
                Name: <input value={personName} onChange={handleNameChange} />
            </div>
            <div>
                Number: <input value={phoneNumber} onChange={handlePhoneChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
export default PersonForm;


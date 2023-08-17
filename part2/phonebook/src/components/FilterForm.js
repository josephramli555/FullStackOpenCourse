const FilterForm = ({value,onChange,onSubmit}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>Filter Shown With <input value={value} onChange={onChange}></input></div>
        </form>
    )
}

export default FilterForm
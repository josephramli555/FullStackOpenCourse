const Total = ({ parts }) => {
    let sum = parts.reduce((acc, currVal) => { return acc + currVal.exercises },0)
    return (
        <h3>Total of {sum} exercises</h3>
    )

}

export default Total
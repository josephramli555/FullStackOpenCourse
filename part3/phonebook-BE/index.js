const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())
morgan.token('type', (req, res) => {
    let bodyLog = {...req.body} 
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))
let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const data = persons.find((person) => Number(id) === person.id)
    if (data) {
        res.json(data)
    } else {
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    const length = persons.length
    const now = new Date()
    let info = `
      <p>Phonebook has info for ${length} people </p>
      <br>
      ${now}
    `
    res.send(info)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    console.log("Persons after delete")
    console.log(persons)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const data = req.body
    if (!data.name || !data.number) {
        return res.status(400).json({
            error: "name property or number property is missing"
        })
    }
    if (persons.findIndex(person => person.name.toLowerCase() === data.name.toLowerCase()) != -1) {
        return res.status(409).json({
            error: "name already exist in phonebook. Pick unique name"
        })
    }

    data.id = Math.floor((Math.random() * 9999999) + 10000)
    persons = persons.concat(data)
    console.log(persons)
    res.json(data)

})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})
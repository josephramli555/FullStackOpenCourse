const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const app = express()



const mongoUrl = config.MONGODB_URI
mongoose.set('strictQuery', false)

mongoose.connect(mongoUrl).then(()=>{
  logger.info("Connected to mongoDB ATLAS")
}
).catch(error=>{
  logger.error('error connecting to mongoDB',error.message)
})
const blogsRouter = require('./controllers/blogs')


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs',blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
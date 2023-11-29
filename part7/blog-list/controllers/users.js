const bcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (request, response, next) => {
    try {
        const { username, password, name } = request.body
        if (!password) {
            response.status(400).send({ error: "username: Path `password` is required" })
        }
        if(password.length < 3){
            response.status(400).send({ error: 'Path `password` is shorter than the minimum allowed length (3)'})
        }
        const passwordHash = await bcrypt.hash(password, 10)

        const user = new User({
            username, name, passwordHash
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (exception) {
        next(exception)
    }

})


userRouter.get('/', async (request, response, next) => {
    try {
        let user = await User.find({}).populate('blogs',{url : 1, title : 1, author : 1})

        response.json(user)
    } catch (exception) {
        next(exception)
    }
})
module.exports = userRouter
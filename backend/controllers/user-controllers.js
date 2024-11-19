const {v4:uuidv4} = require('uuid')
const {validationResult} = require('express-validator')
const HttpError = require('../../../backend/models/https-error')
const usersArray =
[
    {
        id:'u1',
        name:'sasha',
        email:'sasha@sasha.com',
        password:'12345678'
    }

]

const getUsers = (req, res, next) =>
{
    res.json({users:usersArray})
}

const createUser = (req, res, next) =>
{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        console.log(error)
        throw new HttpError("Invalid input", 422)
    }

    const{name, email, password} = req.body
    const hasUser = usersArray.find(u=>u.email === email)
    if(hasUser)
        throw new HttpError('user already exist')
    const createNew = {
        id:uuidv4(),
        name,
        email,
        password
    }
    usersArray.push(createNew)
    res.status(201).json({users:createNew})
}

const login = (req, res, next) =>
{
    const {email, password} = req.body

    const identify = usersArray.find(u=>u.email===email)
    if(!identify || identify.password !==password)
        throw new HttpError('maybe wrong password')
    res.status(200).json({message:"loged in"})
}

exports.getUsers = getUsers
exports.createUser = createUser
exports.login = login
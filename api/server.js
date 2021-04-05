// BUILD YOUR SERVER HERE
const express = require('express')
const users = require('./users/model')
// const { find } = require('./users/model')

const server = express()

server.use(express.json())

//Get all users
server.get('/api/users', (req, res) => {
  users
    .find()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The users information could not be retrieved' })
    })
})

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params
  users
    .findById(id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: 'The user with the specified ID does not exist' })
      } else {
        res.status(200).json(user)
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'The user information could not be retrieved' })
    })
})

server.post('/api/users/', (req, res) => {
  const newUser = req.body
  if (!newUser.name || !newUser.bio) {
    res
      .status(400)
      .json({ message: 'Please provide name and bio for the user' })
  } else {
    users
      .insert(newUser)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((err) => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database',
        })
      })
  }
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  if (!changes.name || !changes.bio) {
    res.status(422).json('Insert name and bio')
  } else {
    users
      .update(id, changes)
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((err) => {
        res.status(500).json({ message: err.message })
      })
  }
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params
  const deletedUser = users.remove(id)

  if (!deletedUser) {
    res.status(422).json('The user with the specified ID does not exist')
  } else {
    deletedUser
      .then((user) => {
        res.status(201).json(user)
      })
      .catch((err) => {
        res.status(500).json({ message: 'The user could not be removed' })
      })
  }
})

module.exports = server // EXPORT YOUR SERVER instead of {}

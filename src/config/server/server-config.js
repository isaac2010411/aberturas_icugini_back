'use strict'

const express = require('express')
const dotenv = require('dotenv')
const { createServer } = require('http')
const cors = require('cors')
const path = require('path')
const connectDB = require('../../mongoose/db')
const apiRoutes = require('../../routes')
const { notFound, errorHandler } = require('../../middleware/errorMiddleware.js')
const { socketConfig } = require('./socket-config')
let usersConnected = []
let adminConnected = []
// Server Config
dotenv.config()
connectDB()

//apply middlewares
const app = express()

const httpServer = createServer(app)

const io = socketConfig(httpServer)

app.use(cors())
app.use(express.json({ limit: '3mb' }))
app.set('io', io)
//  Server Routes
app.use('/api', apiRoutes)

io.on('connection', (socket) => {
  socket.on('user-connected', (user) => {
    const userId = user._id
    const isAdmin = user.isAdmin
    const socketId = socket.id

    if (isAdmin) {
      socket.join('admin')
    } else {
      socket.join('user')
    }
    console.log(isAdmin)
    const personExist = usersConnected.find((person) => person.userId === userId)
    const adminExist = adminConnected.find((person) => person.userId === userId)

    if (!personExist && !isAdmin) {
      usersConnected.push({ socketId, userId })
    } else if (!adminExist) {
      adminConnected.push({ socketId, userId })
    }
  })

  socket.on('disconnect', () => {
    const userIndex = usersConnected.findIndex((person) => person.socketId === socket.id)
    const adminIndex = adminConnected.findIndex((person) => person.socketId === socket.id)

    if (userIndex !== -1) {
      //delete user to array of connected
      usersConnected.splice(userIndex, 1)
      socket.in('user').emit('user-disconnected', { userIndex, usersConnected })
    }

    if (adminIndex !== -1) {
      //delete user to array of connected
      adminConnected.splice(adminIndex, 1)
      socket.in('admin').emit('user-disconnected', { adminIndex, adminConnected })
    }
  })
})

//  Config statics
app.use('/public', express.static(path.join(__dirname, '../../../public')))

if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../../../public', 'index.html')))
}

// Server Middlewares
app.use(notFound)
app.use(errorHandler)

module.exports = httpServer

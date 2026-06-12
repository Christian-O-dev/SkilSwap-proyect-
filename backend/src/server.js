require('dotenv').config()

const http = require('http')
const { Server } = require('socket.io')
const app = require('./app')
const { createMessage } = require('./models/message.model')

const PORT = process.env.PORT || 3000

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

io.on('connection', (socket) => {
  console.log('Usuario conectado al socket:', socket.id)

  socket.on('join_exchange_room', (exchangeId) => {
    socket.join(`exchange_${exchangeId}`)
    console.log(`Socket ${socket.id} se unió a la sala exchange_${exchangeId}`)
  })

  socket.on('send_message', async (data) => {
    try {
      // data: { exchangeId, senderId, content }
      const messageId = await createMessage(data)
      
      const newMessage = {
        id: messageId,
        exchange_id: data.exchangeId,
        sender_id: data.senderId,
        content: data.content,
        created_at: new Date().toISOString()
      }

      // Emitimos el mensaje a todos los que estén en la sala
      io.to(`exchange_${data.exchangeId}`).emit('new_message', newMessage)
    } catch (error) {
      console.error('Error guardando mensaje de socket:', error)
    }
  })

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id)
  })
})

server.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`)
})


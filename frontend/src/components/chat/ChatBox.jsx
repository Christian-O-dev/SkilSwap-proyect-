import { useState, useEffect, useRef } from 'react'
import { io } from 'socket.io-client'
import { useAuth } from '@/context/AuthContext'
import { getMessagesByExchange } from '@/services/messagesService'
import { Send } from 'lucide-react'
import { Button } from '@/components/ui/button'

const SOCKET_URL = import.meta.env.VITE_API_URL 
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:3000'

function ChatBox({ exchange }) {
  const { user, token } = useAuth()
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const socketRef = useRef(null)

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const response = await getMessagesByExchange(exchange.id)
        if (response.ok) {
          setMessages(response.messages)
        }
      } catch (err) {
        console.error('Error cargando historial de mensajes:', err)
      }
    }
    loadMessages()

    socketRef.current = io(SOCKET_URL, {
      auth: { token }
    })

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join_exchange_room', exchange.id)
    })

    socketRef.current.on('new_message', (message) => {
      setMessages((prev) => [...prev, message])
    })

    return () => {
      socketRef.current.disconnect()
    }
  }, [exchange.id, token])

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = (e) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    socketRef.current.emit('send_message', {
      exchangeId: exchange.id,
      senderId: user.id,
      content: inputValue.trim()
    })

    setInputValue('')
  }

  return (
    <div className="flex flex-col h-[400px] border border-slate-200 rounded-2xl bg-slate-50 overflow-hidden">
      <div className="bg-white border-b border-slate-200 px-4 py-3 font-medium text-slate-800">
        Chat del intercambio
      </div>
      
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-400 text-sm">
            Aún no hay mensajes. ¡Escribe algo para empezar!
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = msg.sender_id === user.id
            return (
              <div key={index} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
                  }`}
                >
                  {!isMe && msg.sender_username && (
                    <div className="text-xs text-slate-400 mb-1">{msg.sender_username}</div>
                  )}
                  {msg.content}
                </div>
              </div>
            )
          })
        )}
      </div>

      <form onSubmit={handleSend} className="bg-white p-3 border-t border-slate-200 flex gap-2">
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un mensaje..."
          className="flex-1 bg-slate-100 rounded-full px-4 text-sm outline-none transition focus:ring-2 focus:ring-blue-100"
        />
        <Button type="submit" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 shrink-0">
          <Send size={16} />
        </Button>
      </form>
    </div>
  )
}

export default ChatBox

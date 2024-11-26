'use client'
import { useEffect, useRef, useState } from 'react'
import './style.sass'
import io from 'socket.io-client'

export default function LabaPage(){
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])
    const socketRef = useRef(null)

    useEffect(() => {
        const newSocket = io(`http://localhost:3002/`)
        socketRef.current = newSocket
    
        // Обработка получения новых сообщений от сервера
        newSocket.on('receiveMessage', (data) => {
            setMessages(prevMessages => [...prevMessages, data])
        })
    
        return () => {
            newSocket.disconnect()
        };
    }, []);
    
    function sendMessage(e) {
        e.preventDefault()
        const data = {
            Message: input,
            Sender: 'user',
        }
    
        const socket = socketRef.current
        socket.emit("sendMessage", data)
    
        setMessages(prevMessages => [...prevMessages, data])
        setInput('')
    }
    

    return(
        <div className="dark">
            <div className="center">
                <h1>Laba 7</h1>
                <div className="display">
                    <div className='mb10 message user_message'>Лаба</div>
                    <div className='mb10 message friend_message'>7.6</div>
                    {messages.map((msg, index) => (
                        <div key={index} className={`mb10 message ${msg.Sender === "user" ? "user_message" : "friend_message"}`}>
                            {msg.Message}
                        </div>
                    ))}
                    <form onSubmit={(e)=>{sendMessage(e)}}>
                        <input value={input} placeholder='Сообщение' onChange={(e)=>setInput(e.target.value)}/>
                    </form>
                </div>
                <div className='iphone'></div>
            </div>
        </div>
    )
}
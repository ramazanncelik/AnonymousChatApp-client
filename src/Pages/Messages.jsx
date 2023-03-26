import React, { useContext, useEffect, useRef } from 'react'
import MyMessage from '../components/MyMessage';
import OtherMessage from '../components/OtherMessage';
import { AuthContext } from '../navigation/AuthProvider'

const Messages = ({ messages }) => {

    const { user } = useContext(AuthContext);
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className='w-[50%] h-[75%] overflow-auto bg-white border border-slate-600 rounded-lg p-2 flex flex-col space-y-2'>
            {messages.map((message) => {
                if (message.From === user) {
                    return (
                        <MyMessage key={message._id} messageData={message} />
                    )
                } else {
                    return (
                        <OtherMessage key={message._id} messageData={message} />
                    )
                }
            })}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default Messages

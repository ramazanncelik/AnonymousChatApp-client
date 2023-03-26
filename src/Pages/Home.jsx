import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react'
import { createMessage } from '../apollo/Message/messageMutation';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment'
import Messages from './Messages';
import { getMessages } from '../apollo/Message/messageQuery';
import { messageCreated } from '../apollo/Message/messageSubscriptions';

const Home = () => {

    const { user } = useContext(AuthContext);
    const [Description, setDescription] = useState("");
    const [messages, setMessages] = useState([]);
    const { data, subscribeToMore } = useQuery(getMessages);
    const [sendMessage] = useMutation(createMessage);

    const handleSubmit = async (key) => {
        if (key === "Enter") {
            if (Description) {

                let today = new Date();

                let todayy = today.getFullYear() + "" +
                    ((today.getMonth() + 1) < 10 ? ("0" + (today.getMonth() + 1))
                        : (today.getMonth() + 1)) + "" + today.getDate() + ", " +
                    today.getHours() + ":" +
                    ((today.getMinutes()) < 10 ? ("0" + (today.getMinutes()))
                        : (today.getMinutes())) + ":" +
                    today.getSeconds();

                const time = today.getFullYear() + "" +
                    (today.getMonth() < 10 ? ("0" + today.getMonth()) : today.getMonth())
                    + "" +
                    (today.getDate() < 10 ? ("0" + today.getDate()) : today.getDate())
                    + "" +
                    (today.getHours() < 10 ? ("0" + today.getHours()) : today.getHours())
                    + "" +
                    (today.getMinutes() < 10 ? ("0" + today.getMinutes()) : today.getMinutes())
                    + "" +
                    (today.getSeconds() < 10 ? ("0" + today.getSeconds()) : today.getSeconds())
                    + "" +
                    (today.getMilliseconds() < 10 ? ("0" + today.getMilliseconds()) : today.getMilliseconds());

                const message = await sendMessage({
                    variables: {
                        data: {
                            From: user,
                            Description,
                            FullDate: todayy,
                            Date: moment().format("lll"),
                            Time: time,
                            Month: (today.getMonth() + 1),
                        }
                    }
                });
                if (message) {
                    setDescription("");
                }
            }
        }
    }

    useEffect(() => {

        subscribeToMore({
            document: messageCreated,
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.data) return prev;

                const newMessage = subscriptionData.data.messageCreated;
                return {
                    messages: [
                        ...prev.messages,
                        newMessage
                    ],
                };
            }
        })

    }, [subscribeToMore]);

    useEffect(() => {

        if (data) {
            setMessages(data.messages);
        }

    }, [data]);

    return (
        <div className='w-full h-screen flex flex-col space-y-2 bg-slate-700 items-center justify-center'>

            <Messages messages={messages} />

            <div className='w-[50%] flex flex-row space-x-3'>

                <input
                    placeholder='Type Your Message and Press Enter'
                    onKeyDown={e => handleSubmit(e.key)}
                    value={Description}
                    onChange={e => setDescription(e.target.value)}
                    type="text"
                    className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required />

            </div>
        </div>
    )
}

export default Home

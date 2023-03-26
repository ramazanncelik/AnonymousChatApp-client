import moment from 'moment';
import React from 'react'

const MyMessage = ({ messageData }) => {

    const month = new Date().getMonth() + 1;

    return (
        <div className='w-full flex items-center justify-end'>
            <div className='min-w-[25%] max-w-[80%] p-2 bg-green-500 rounded-lg flex flex-col'>
                <p className='text-gray-200 font-bold text-sm'>
                    Siz
                </p>
                <p className='text-white text-sm'>
                    {messageData.Description}
                </p>
                <p className='text-gray-200 text-sm text-end'>
                    {
                        messageData.Month !== month ?
                            messageData.Date
                            :
                            moment(messageData.FullDate, "YYYYMMDD, h:mm:ss").fromNow()
                    }
                </p>
            </div>
        </div>
    )
}

export default MyMessage

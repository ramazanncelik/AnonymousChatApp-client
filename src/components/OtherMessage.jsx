import moment from 'moment';
import React from 'react'

const OtherMessage = ({ messageData }) => {

    const month = new Date().getMonth() + 1;

    return (
        <div className='w-full flex items-center justify-start'>
            <div className='min-w-[25%] max-w-[80%] p-2 bg-gray-300 rounded-lg flex flex-col'>
                <p className='text-gray-500 font-bold text-sm'>
                    {messageData.From}
                </p>
                <p className='text-black text-sm'>
                    {messageData.Description}
                </p>
                <p className='text-gray-500 text-sm text-end'>
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

export default OtherMessage

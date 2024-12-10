import React from 'react'
import { Message } from '../interfaces/interfaces'

interface Props {
    content: Message
}
const Note = ({ content }: Props) => {
    return (
        <div className='max-w-[150px] flex justify-center items-start max-w-[80%] p-3 rounded-lg text-white bg-gray-800 mb-4'>
            {content.value}
        </div>
    )
}

export default Note
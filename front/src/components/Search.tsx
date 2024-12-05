import { useState } from "react";
import { Message } from "../interfaces/interfaces";
import Chat from "./Chat";

const Search = () => {
    const [searchValue, setSearchValue] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const auotMsg = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iure doloremque odio, quidem rerum at veritatis maxime distinctio nihil, velit, saepe explicabo mollitia? Vel, repudiandae?'

    const handleSendMessage = async () => {
        if (searchValue.trim() === '') return;

        const newMessage: Message = {
            type: 'user',
            value: searchValue,
        }

        const newMessages: Message[] = [...messages, newMessage];
        setMessages(newMessages);
        await sendMessage(newMessage);
        setSearchValue('');

    }

    const sendMessage = async (message: Message): Promise<void> => {
        try {
            console.log('handle send message: ', message);
        } catch (error) {

        } finally {
            const autoMessage: Message = {
                type: 'response',
                value: auotMsg
            }
            setMessages(prevMessages => [...prevMessages, autoMessage]);
        }
    }


    return (
        <>
            <div className="input-wrapper min-w-96 relative mt-6">
                <input
                    type="text"
                    className="min-h-14 p-2 min-w-full rounded-3xl focus:outline-none text-white-700 bg-gray-950"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                <button
                    className="btn-searach p-4 rounded-full bg-white absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={handleSendMessage}
                >

                </button>
            </div>

            {messages.length > 0 && <Chat messages={messages} />}

        </>
    )
}

export default Search
import { Message } from "../interfaces/interfaces";
import saveLogo from '../assets/save.svg'
import saveFullLogo from '../assets/save-full.svg'

interface Props {
    messages: Message[],
    handleSaveMessage: (arg0: number) => void,
}

const Chat = ({ messages, handleSaveMessage }: Props) => {

    return (
        <div className="flex flex-col h-[400px] w-full max-w-2xl mx-auto rounded-xl shadow-md bg-gray-950 mt-6">
            <div className="flex-grow overflow-y-auto p-4 flex flex-col justify-start space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.type === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                            }`}
                    >
                        <div
                            className={`flex justify-center items-start max-w-[80%] p-3 rounded-lg text-white ${msg.type === 'user'
                                ? 'bg-gray-800'
                                : 'bg-[--green]'
                                }`}
                        >
                            <div className="w-auto max-w-[90%]">{msg.value}</div>

                            {!!msg.save ?
                                <button onClick={() => handleSaveMessage(index)} className="max-w-[30px]"><img className="h-[24px] w-[24px]" src={saveFullLogo}></img></button>
                                :
                                <button onClick={() => handleSaveMessage(index)} className="max-w-[30px]"><img className="h-[24px] w-[24px]" src={saveLogo}></img></button>}
                        </div>
                    </div>
                ))}
                {/* {isLoading && (
            <div className="flex justify-start">
                <div className="bg-gray-200 text-black p-3 rounded-lg">
                    Ładowanie...
                </div>
            </div>
        )} */}
                {/* <div ref={messagesEndRef} /> */}
            </div>
        </div>
    )
}

export default Chat
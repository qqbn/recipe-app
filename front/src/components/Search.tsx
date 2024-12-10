import { Message } from "../interfaces/interfaces";
import Chat from "./Chat";

interface Props {
    handleSendMessage: () => void,
    messages: Message[],
    handleSetSearchValue: (arg0: string) => void,
    searchValue: string,
    handleSaveMessage: (arg0: number) => void,
}

const Search = ({ handleSendMessage, messages, handleSetSearchValue, searchValue, handleSaveMessage }: Props) => {

    return (
        <>
            <div className="input-wrapper min-w-96 relative mt-6">
                <input
                    type="text"
                    className="min-h-14 p-2 min-w-full rounded-3xl focus:outline-none text-white-700 bg-gray-950"
                    placeholder="Search..."
                    value={searchValue}
                    onChange={(e) => handleSetSearchValue(e.target.value as string)}
                />
                <button
                    className="btn-searach p-4 rounded-full bg-white absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={handleSendMessage}
                >

                </button>
            </div>

            {messages.length > 0 && <Chat messages={messages} handleSaveMessage={handleSaveMessage} />}

        </>
    )
}

export default Search
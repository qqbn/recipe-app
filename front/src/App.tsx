import { useState } from 'react'
import Switcher from './components/Switcher'
import Search from './components/Search'
import Notes from './components/Notes'
import { Message } from "./interfaces/interfaces";
import './App.css'

function App() {
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const auotMsg = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iure doloremque odio, quidem rerum at veritatis maxime distinctio nihil, velit, saepe explicabo mollitia? Vel, repudiandae?'

  const handleSetActive = () => {
    setActive(!active)
  }

  const handleSetSearchValue = (value: string) => {
    setSearchValue(value)
  }

  const handleSendMessage = async () => {
    if (searchValue.trim() === '') return;

    const newMessage: Message = {
      id: 1,
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
        id: 1,
        type: 'response',
        value: auotMsg,
        save: false,
      }
      setMessages(prevMessages => [...prevMessages, autoMessage]);
    }
  }

  const handleSaveMessagage = (index: number) => {
    setMessages(prevMessages =>
      prevMessages.map((message, messageIndex) =>
        messageIndex === index ? { ...message, save: !message.save } : message
      )
    )
  }

  return (
    <>
      <h1 className="text-white text-8xl font-bold mt-6">Recipe app</h1>
      <Switcher handleSetActive={handleSetActive} active={active}></Switcher>
      {!active ?
        <Search
          handleSendMessage={handleSendMessage}
          messages={messages}
          handleSetSearchValue={handleSetSearchValue}
          searchValue={searchValue}
          handleSaveMessage={handleSaveMessagage}
        />
        :
        <Notes messages={messages} />
      }
    </>
  )
}

export default App

import { useState, useEffect } from 'react'
import Switcher from './components/Switcher'
import Search from './components/Search'
import Notes from './components/Notes'
import { Message, Note } from "./interfaces/interfaces";
import axios from 'axios';
import './App.css'

function App() {
  const apiurl = 'http://localhost:3000/';
  let id = 0;
  const [active, setActive] = useState(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [notes, setNotes] = useState<Note[]>([]);
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
      id: id++,
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
        id: id++,
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

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    console.log('active:', active);
    console.log('over', over);
    if (active.id === over.id) return;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiurl + 'notes');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

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
        <Notes handleDragEnd={handleDragEnd} messages={messages} />
      }
    </>
  )
}

export default App

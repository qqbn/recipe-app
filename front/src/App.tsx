import { useState, useEffect } from 'react'
import Switcher from './components/Switcher'
import Search from './components/Search'
import Notes from './components/Notes'
import { Message, Note } from "./interfaces/interfaces";
import axios from "./axios-config"
import './App.css'
import { arrayMove } from "@dnd-kit/sortable";

function App() {
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

  const handleSaveMessage = (index: number) => {

    // const message = messages[index];
    // console.log(message);

    // if (!message.save) {
    //   saveMessage(message.value);
    // } else {

    // }

    setMessages(prevMessages =>
      prevMessages.map((message, messageIndex) =>
        messageIndex === index ? { ...message, save: !message.save } : message
      )
    )
  }

  // const saveMessage = async (message: string): Promise<void> => {
  //   try {
  //     const response = await axios.post(apiurl + 'notes', {
  //       data: message,
  //     })
  //     console.log(response);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }


  const getNotePosition = (id: number) => {
    return notes.findIndex(note => note.id === id);
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id === over?.id) return;

    setNotes((notes) => {
      const oldIndex = getNotePosition(active.id);
      const newIndex = getNotePosition(over.id);

      return arrayMove(notes, oldIndex, newIndex);
    })
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/notes');
        setNotes(response.data);
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
          handleSaveMessage={handleSaveMessage}
        />
        :
        <Notes handleDragEnd={handleDragEnd} notes={notes} />
      }
    </>
  )
}

export default App

import { useState } from 'react'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, PointerSensor, KeyboardSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Note as NoteInterface } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"
import Modal from "./Modal"

interface Props {
    notes: NoteInterface[],
    handleDragEnd: (arg1: any) => void,
}

const Notes = ({ notes, handleDragEnd }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [id, setId] = useState(0);
    const pointerSensor = useSensor(PointerSensor, {
        activationConstraint: {
            distance: 0.01
        }
    })
    const mouseSensor = useSensor(MouseSensor)
    const touchSensor = useSensor(TouchSensor)
    const keyboardSensor = useSensor(KeyboardSensor)

    const sensors = useSensors(
        mouseSensor,
        touchSensor,
        keyboardSensor,
        pointerSensor
    )


    const openModal = (title: string, content: string, id: number) => {
        setTitle(title);
        setContent(content);
        setId(id);
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    }

    return (
        <>
            <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} autoScroll={false} sensors={sensors} >
                <SortableContext items={notes} strategy={verticalListSortingStrategy}>
                    <NotesWrapper>
                        {notes.map((note: NoteInterface, index: number) => (
                            <Note id={note.id} note={note} key={index} openModal={openModal} />
                        ))}
                    </NotesWrapper>
                </SortableContext>
            </DndContext>

            {isOpen && <Modal title={title} content={content} handleOverlayClick={handleOverlayClick} closeModal={closeModal} id={id} />}
        </>
    )
}


export default Notes
import { useState } from 'react'
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, PointerSensor, KeyboardSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Note as NoteInterface } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"
import Close from '@/assets/close.svg';
import Show from '@/assets/show.svg';
import Download from '@/assets/download.svg'

interface Props {
    notes: NoteInterface[],
    handleDragEnd: (arg1: any) => void,
}

const Notes = ({ notes, handleDragEnd }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
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


    const openModal = (title: string, content: string) => {
        setTitle(title);
        setContent(content);
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

            {isOpen && <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                onClick={handleOverlayClick}
            >
                <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
                    <button
                        onClick={closeModal}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <img className="h-[24px] w-[24px]" src={Close} alt="Close icon" />
                    </button>

                    <h2 className="text-xl font-bold mb-4">
                        {title}
                    </h2>

                    <div className="mb-6">
                        {content}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button><img className="h-[32px] w-[32px] pointer" src={Download} alt="Download Icon" /></button>
                        <button><img className="h-[32px] w-[32px]" src={Show} alt="Show Icon" /></button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default Notes
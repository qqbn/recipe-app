import { DndContext, closestCorners } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Message } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"

interface Props {
    messages: Message[],
    handleDragEnd: (arg1: any) => void,
}

const Notes = ({ messages, handleDragEnd }: Props) => {
    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
            <SortableContext items={messages} strategy={verticalListSortingStrategy}>
                <NotesWrapper>
                    {messages.map((message) => (
                        <Note id={message.id} content={message} />
                    ))}
                </NotesWrapper>
            </SortableContext>
        </DndContext>
    )
}

export default Notes
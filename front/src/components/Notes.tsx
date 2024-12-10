import { DndContext, closestCorners } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Message } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"

interface Props {
    messages: Message[],
}

const Notes = ({ messages }: Props) => {
    return (
        <DndContext collisionDetection={closestCorners}>
            <SortableContext items={messages} strategy={verticalListSortingStrategy}>
                <NotesWrapper>
                    {messages.map((message, index) => (
                        <Note key={message.id} content={message} />
                    ))}
                </NotesWrapper>
            </SortableContext>
        </DndContext>
    )
}

export default Notes
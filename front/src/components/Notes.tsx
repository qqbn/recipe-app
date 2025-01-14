import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Note as NoteInterface } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"

interface Props {
    notes: NoteInterface[],
    handleDragEnd: (arg1: any) => void,
}

const Notes = ({ notes, handleDragEnd }: Props) => {
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));
    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} autoScroll={false} sensors={sensors} >
            <SortableContext items={notes} strategy={verticalListSortingStrategy}>
                <NotesWrapper>
                    {notes.map((note: NoteInterface, index: number) => (
                        <Note id={note.id} note={note} key={index} />
                    ))}
                </NotesWrapper>
            </SortableContext>
        </DndContext>
    )
}

export default Notes
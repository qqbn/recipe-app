import { DndContext, closestCorners, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, PointerSensor, KeyboardSensor } from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Note as NoteInterface } from "../interfaces/interfaces"
import NotesWrapper from "./NotesWrapper"
import Note from "./Note"

interface Props {
    notes: NoteInterface[],
    handleDragEnd: (arg1: any) => void,
    handleClick: () => void,
}

const Notes = ({ notes, handleDragEnd, handleClick }: Props) => {
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

    return (
        <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter} autoScroll={false} sensors={sensors} >
            <SortableContext items={notes} strategy={verticalListSortingStrategy}>
                <NotesWrapper>
                    {notes.map((note: NoteInterface, index: number) => (
                        <Note id={note.id} note={note} key={index} handleClick={handleClick} />
                    ))}
                </NotesWrapper>
            </SortableContext>
        </DndContext>
    )
}

export default Notes
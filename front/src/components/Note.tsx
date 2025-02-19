import { Note as NoteInterface } from '../interfaces/interfaces'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    note: NoteInterface
    id: number,
    openModal: (arg1: string, arg2: string, arg3: number) => void,
}
const Note = ({ note, id, openModal }: Props) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <div onClick={() => { if (!isDragging) openModal(note.title, note.content, id) }} className="TEST max-w-[150px] flex justify-center items-start p-3 rounded-lg text-white bg-gray-800 mb-4 cursor-pointer">
                {note.title}
            </div>
        </div>
    )
}

export default Note
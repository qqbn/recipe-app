import { Note as NoteInterface } from '../interfaces/interfaces'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    note: NoteInterface
    id: number,
    handleClick: () => void,
}
const Note = ({ note, id, handleClick }: Props) => {
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
            <div onClick={() => { if (!isDragging) handleClick() }} className="TEST max-w-[150px] flex justify-center items-start p-3 rounded-lg text-white bg-gray-800 mb-4 cursor-pointer">
                {note.title}
            </div>
        </div>
    )
}

export default Note
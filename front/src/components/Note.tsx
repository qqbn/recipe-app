import { Note as NoteInterface } from '../interfaces/interfaces'
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
    note: NoteInterface
    id: number
}
const Note = ({ note, id }: Props) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition
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
            <div className='max-w-[150px] flex justify-center items-start max-w-[200px] p-3 rounded-lg text-white bg-gray-800 mb-4'>
                {note.content}
            </div>
        </div>
    )
}

export default Note
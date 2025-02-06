export interface Message {
    id: number,
    type: string,
    value: string,
    save?: boolean,
}

export interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: Date,
}
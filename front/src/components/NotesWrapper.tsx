import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const CardsWrapper = ({ children }: Props) => {
    return (
        <div className='flex flex-col h-[500px] w-full max-w-[800px] mx-auto rounded-xl bg-gray-950 mt-6 flex-col flex-wrap'>
            {children}
        </div>
    )
}

export default CardsWrapper
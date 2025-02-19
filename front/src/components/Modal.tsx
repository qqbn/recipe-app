import React from 'react';
import Close from '@/assets/close.svg';
import Show from '@/assets/show.svg';
import Download from '@/assets/download.svg'
import axios from "@/axios-config"

interface Props {
    handleOverlayClick: (arg1: React.MouseEvent<HTMLDivElement>) => void,
    closeModal: () => void,
    title: string,
    content: string,
    id: number
}

const downloadPdf = async (id: number): Promise<BlobPart> => {
    try {
        const response = await axios.get(`/notes/${id}/download-pdf`, {
            responseType: 'blob'
        });
        return response.data;
    } catch (error) {
        throw new Error('Cannot download PDF file');
    }
}

const handleDownload = async (id: number): Promise<void> => {
    try {
        const data = await downloadPdf(id);
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = `note-${id}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.log(error);
    }
}

const handleShowPdf = async (id: number): Promise<void> => {
    try {
        const data = await downloadPdf(id);
        const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        window.open(url, '_blank');
        setTimeout(() => {
            window.URL.revokeObjectURL(url);
        }, 10000);
    } catch (error) {
        console.log(error);
    }
}

const Modal = ({ handleOverlayClick, closeModal, title, content, id }: Props) => {
    return (
        <>
            <div
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
                        <button onClick={() => handleDownload(id)}><img className="h-[32px] w-[32px] pointer" src={Download} alt="Download Icon" /></button>
                        <button onClick={() => handleShowPdf(id)}><img className="h-[32px] w-[32px]" src={Show} alt="Show Icon" /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal
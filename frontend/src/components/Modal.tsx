import { IoClose } from 'react-icons/io5';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'danger' | 'info';
    onConfirm?: () => void;
    confirmText?: string;
}

export function Modal({ isOpen, onClose, title, message, type = 'info', onConfirm, confirmText }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="w-[400px] p-6 rounded-2xl bg-[#16161e] border border-purple-500/20 shadow-xl shadow-purple-500/10 flex flex-col gap-4 animate-fade-in relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                    <IoClose size={24} />
                </button>

                <div className="flex flex-col gap-2">
                    <span className={`text-xl font-semibold ${type === 'success' ? 'text-green-400' : type === 'danger' ? 'text-red-400' : 'text-purple-400'}`}>
                        {title}
                    </span>
                    <span className="text-gray-300 text-[15px]">
                        {message}
                    </span>
                </div>

                <div className="flex flex-row justify-end gap-3 mt-2">
                    {onConfirm && (
                        <button
                            onClick={() => {
                                onConfirm()
                                onClose()
                            }}
                            className={`px-4 py-2 cursor-pointer rounded-xl text-white font-medium transition-all ${type === 'danger'
                                    ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/20'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                }`}
                        >
                            {confirmText || 'Confirmar'}
                        </button>
                    )}
                    <button
                        onClick={onClose}
                        className="px-4 py-2 cursor-pointer rounded-xl bg-transparent border border-gray-600/30 hover:bg-gray-600/20 text-gray-300 transition-all"
                    >
                        {onConfirm ? 'Cancelar' : 'Fechar'}
                    </button>
                </div>
            </div>
        </div>
    );
}

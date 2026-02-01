import { FaRegTrashCan } from "react-icons/fa6";
import { useState } from "react";
import { Modal } from "./Modal";


type TrashProps = {
    text?: string,
    width?: string,
    height?: string,
    action?: () => void
}

export function Trash({ text, width, height, action }: TrashProps) {
    const [showModal, setShowModal] = useState(false)

    return (
        <>
            <button
                type="button"
                className={`flex flex-row items-center justify-center cursor-pointer rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 ${height ? "h-" + height : " min-h-10"}  ${width ? "w-" + width : "min-w-12"}`}
                onClick={(e) => {
                    e.stopPropagation()
                    setShowModal(true)
                }}
            >
                <div className="flex flex-row items-center justify-center pl-4 pr-4 gap-2">
                    <FaRegTrashCan className="w-4 h-4" />
                    {text && <span className="text-[14px] mt-[3px]">{text}</span>}
                </div>
            </button>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Confirmar Exclusão"
                message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
                type="danger"
                onConfirm={action}
                confirmText="Excluir"
            />
        </>
    )
}
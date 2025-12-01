import { FaRegTrashCan } from "react-icons/fa6";




export function Trash({ text }: { text?: string }) {
    return (
        <>
            <button className="flex flex-row items-center justify-center cursor-pointer min-w-12 min-h-10 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
                <div className="flex flex-row items-center justify-center pl-4 pr-4 gap-2">
                    <FaRegTrashCan className="w-4 h-4" /> {/*Talvez necessite de um ID para verificar qual perfil é*/}
                    {text && <span className="text-[14px] mt-[3px]">{text}</span>}
                </div>

            </button>
        </>
    )
}
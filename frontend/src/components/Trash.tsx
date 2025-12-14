import { FaRegTrashCan } from "react-icons/fa6";


type TrashProps = {
    text?: string,
    width?: string,
    height?: string,
    action?: () => void
}

export function Trash({ text, width, height, action }: TrashProps) {
    return (
        <>
            <button 
                type="button" 
                className={`flex flex-row items-center justify-center cursor-pointer rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all duration-300 border border-red-500/20 hover:border-red-500/40 ${height ? "h-"+height : " min-h-10"}  ${width ? "w-"+width : "min-w-12"}`}
                onClick={action}
            >
                <div className="flex flex-row items-center justify-center pl-4 pr-4 gap-2">
                    <FaRegTrashCan className="w-4 h-4" /> {/*Talvez necessite de um ID para verificar qual perfil é*/}
                    {text && <span className="text-[14px] mt-[3px]">{text}</span>}
                </div>

            </button>
        </>
    )
}
import { GiSteak } from "react-icons/gi";
import { GoPencil } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { Trash } from "./Trash";

type CustomersCardProps = {
    name: string,
    price: number,
    id?: number
} // Depois retirar a opcionalidade dos elementos


export function SteakCard({name, price}: CustomersCardProps) {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-250 h-25 flex flex-row items-center group rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-500/20">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <GiSteak className="text-3xl" />
                </div>
                <div className="p-6">
                    <div className="flex flex-col ">
                        <span className="text-[20px]">{name}</span>
                        <span className="text-[16px] text-desc">Preço: <span className="text-[16px] text-purple-400">R$ {price}/kg</span></span>
                    </div>
                    
                </div>
                <div className="ml-auto flex flex-row gap-4 items-end">
                    <button 
                        className="flex items-center w-fit p-3 h-10 rounded-2xl cursor-pointer bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        onClick={() => navigate("/create-steak")}
                    >
                         <GoPencil className="w-5 h-5"/> {/*Talvez necessite de um ID para verificar qual carne é*/}
                    </button>
                    <Trash />
                </div>
            </div>
        </>
    )
}
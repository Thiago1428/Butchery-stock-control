import { LuUser } from "react-icons/lu";
import { LuShoppingBag } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

type CustomersCardProps = {
    name: string,
    orders?: number,
    total?: number,
    id?: number
} // Depois retirar a opcionalidade dos elementos


export function CustomersCard({name}: CustomersCardProps) {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-250 h-25 flex flex-row items-center group rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-500/20">
                <div className="w-14 h-14 rounded-xl bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg shadow-purple-500/30">
                    <LuUser className="text-3xl" />
                </div>
                <div className="p-6">
                    <span className="text-[20px]">{name}</span>
                    <div className="flex flex-row gap-8">
                        <div className="flex flex-row text-icons items-center gap-2">
                            <LuShoppingBag />
                            <span className="text-[14px]">12 pedidos</span> {/*Var*/}
                        </div>
                        <span className="text-desc text-[14px]">Total: <span className="text-value text-[14px]">R$ 12.000,00</span></span> {/*Var*/}
                    </div>
                </div>
                <div className="ml-auto flex flex-row gap-4 items-end">
                    <button 
                        className="w-35 h-10 rounded-2xl cursor-pointer bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 transition-all duration-300 border border-purple-500/30 hover:border-purple-500/50"
                        onClick={() => navigate("/profile")}
                    >
                        Ver Perfil {/*Talvez necessite de um ID para verificar qual perfil é*/}
                    </button>
                    <button className="flex flex-row items-center justify-center cursor-pointer w-12 h-10 rounded-xl bg-red-600/10 hover:bg-red-600/20 text-red-400 transition-all duration-300 border border-red-500/20 hover:border-red-500/40">
                        <FaRegTrashCan className="w-4 h-4" /> {/*Talvez necessite de um ID para verificar qual perfil é*/}
                    </button>
                </div>
            </div>
        </>
    )
}
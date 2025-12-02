import { Return } from "../components/Return";
import { LuUser } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { FaRegClipboard } from "react-icons/fa";




export function Notes() {

    const costumers = [
        { name: "Thiago" },
        { name: "Person2" }
    ]



    return (
        <>
            <main className="flex w-screen min-h-screen h-full p-0 m-0">
                <div className="w-full h-full flex flex-col items-center text-white">
                    <div className="flex flex-col w-150 mt-12">
                        <div className="flex flex-col gap-2">
                            <Return />
                            <div className="flex flex-col gap-2">
                                <span className="text-2xl">Criar Nota (Pedido)</span>
                                <span className="text-[16px] text-desc">Registre um novo pedido para o cliente</span>
                            </div>
                        </div>
                        <form className="flex flex-col gap-8 mt-4">
                            <div className="flex flex-col gap-8 w-200 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                <div className="flex flex-row justify-between gap-8 items-center">
                                    <div className="w-full">
                                        <div className="flex flex-row gap-1">
                                            <LuUser className="w-5 h-5 text-purple-400" />
                                            <span className="text-[16px] text-desc">Cliente</span>
                                        </div>
                                        <div className="relative flex flex-row items-center mt-2">
                                            <div className="flex flex-row w-full">
                                                <div className="w-full pl-2 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50">
                                                    <select id="teste" defaultValue="Selecionar clientes" className="outline-none min-w-60 w-full transition-colors text-white pr-4">
                                                        <option disabled={true} className="text-white bg-black">Selecionar clientes</option>
                                                        {costumers.map(item => {
                                                            return (
                                                                <option className="text-white bg-black">{item.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row gap-1">
                                            <CiCalendar className="w-5 h-5 text-purple-400" />
                                            <span>Data</span>
                                        </div>
                                        <div className="mt-2">
                                            <input type="date" id="date-input" required className="pl-2 pr-4 py-3 min-w-60 w-full rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white dark:scheme-dark" />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-row gap-1">
                                        <FaRegClipboard className="w-5 h-5 text-purple-400/80" />
                                        <span className="text-[16px] text-desc">Observação</span>
                                    </div>
                                    <div className="mt-2">
                                        <textarea placeholder="Anotações sobre o pedido" className="w-full pl-4 text-[14px] pr-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600 resize-none"></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 w-200 text-white rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                <div>
                                    <span className="text-xl">Selecione as carnes</span>
                                </div>
                                <div>
                                    {/*Componentizar*/}
                                </div>
                            </div>


                        </form>
                    </div>

                </div>
            </main>
        </>
    )
}
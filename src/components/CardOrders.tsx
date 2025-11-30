import { FaPix } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";


export function CardOrders() {
    const orders: number = 1

    return (
        <>
            <div className={`rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10 top-8 w-165 ${orders == 0 ? "flex flex-col items-center justify-center" : ""}`}>
                {/*Adicionar IF caso tenha pedido anterior, caso não houver mensagem de nenhum pedido*/}
                {orders > 0 && <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] text-desc">27 de novembro de 2025</span>
                            <span className="text-purple-400 text-xl">R$ 279.65</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-desc mb-2">Itens:</span>
                            <div className="grid grid-cols-3 items-center gap-2 w-125">
                                <div className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                    Picanha (2.5 Kg)
                                </div>
                                <div className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                    Costela (4 Kg)
                                </div><div className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                    Maminha (8 Kg)
                                </div>

                            </div>
                            <span className="mt-4 text-sm text-desc italic">"Entregar após as 18h"</span>
                        </div>
                    </div>
                    <div className="px-4 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center">
                        <FaPix className="text-purple-400 w-4 h-4" />
                    </div>
                </div>}

                {orders == 0 && <div className="flex flex-col items-center justify-center gap-4">
                    <LuShoppingBag className="text-icons text-6xl" />
                    <span className="text-desc">Nenhum pedido registrado</span>
                </div>
                }

            </div>
        </>
    )
}
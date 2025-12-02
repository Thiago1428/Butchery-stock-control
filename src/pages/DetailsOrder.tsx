import { CardInfoDetails } from "../components/CardInfoDetails";
import { Return } from "../components/Return";
import { Trash } from "../components/Trash";
import { LuUser } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";





export function DetailsOrder() {

    const Itens = [
        { steak: "Picanha", weight: 4, price: 80},
        { steak: "Costela", weight: 2, price: 42 },
        //{ steak: "Filé", weight: 1.2, price: 54 },
        //{ steak: "Picanha", weight: 4, price: 80 },
        //{ steak: "Costela", weight: 2, price: 42 },
        //{ steak: "Filé", weight: 1.2, price: 54 }
    ]

    let final_value = 0
    Itens.map(item => final_value+= item.price*item.weight)

    return (
        <>
            <main className="w-full min-h-screen h-full p-0 m-0 flex flex-col items-center">
                <div className="flex flex-col text-white w-200 mt-20 gap-8 mb-12">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-col">
                            <div className="mb-4">
                                <Return />
                            </div>
                            <span className="text-2xl">Detalhes do Pedido</span>
                            <span className="text-desc text-[16px]">#1</span> {/*ID do pedido*/}
                        </div>
                        <div className="flex items-center">
                            <Trash text="Excluir" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <CardInfoDetails Icon={LuUser} name="Clientes" text="Person1"/>
                        </div>
                        <div className="flex flex-row w-full gap-6">
                            <CardInfoDetails Icon={CiCalendar} name="Data" text="27 de novembro de 2025" className="text-white" />
                            <CardInfoDetails Icon={GoCreditCard} name="Forma de Pagamento" text="Pix" className="text-white" />
                        </div>
                        <CardInfoDetails
                            name="Itens de pedido"
                            ExtraContent={
                                Itens.map(item => (
                                    <div className="flex items-center justify-between p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xl text-white">{item.steak}</span>
                                            <span className="text-desc text-[16px]">R$ {item.price}/kg x {item.weight}kg</span>
                                        </div>
                                        <div>
                                            <span>R$ {(item.price * item.weight).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))
                            } />
                        <CardInfoDetails  
                            Icon={FaDollarSign} 
                            name="Resumo Financeiro" 
                            ExtraContent={
                                <>
                                    <div className="flex flex-row justify-between items-center pb-3 border-b border-purple-500/20">
                                        <span className="text-desc text-[15px]">Total:</span>
                                        <span className="text-2xl text-purple-400">R$ {(final_value).toFixed(2)}</span>
                                    </div>
                                </>
                            }/>
                        <CardInfoDetails name="Observação" text='"Entregar após as 18h"' className="text-[16px] text-desc italic"/>
                    </div>

                </div>
            </main>
        </>
    )
}
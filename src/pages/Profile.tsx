import { Button } from "../components/Button";
import { Return } from "../components/Return";
import { FaDollarSign } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { CardInfo } from "../components/CardInfo";
import { CardOrders } from "../components/CardOrders";
import { useNavigate } from "react-router-dom";


export function Profile() {

    const navigate = useNavigate()

    return (
        <>
            <main className="w-screen min-h-screen h-full p-0 m-0 font-display bg-(--bg-primary) text-white">
                <div className="flex flex-row items-center justify-center pt-12">
                    <div className="flex flex-row gap-4">
                        <div className="flex flex-col">
                            <div className="top-8 sticky">
                                <div className="mb-4">
                                    <Return />
                                </div>
                                <div className="rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                    <div className="text-center mb-8">
                                        <div className="w-24 h-24 rounded-2xl bg-linear-to-br from-purple-600 to-purple-800 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
                                            <span className="text-3xl">P</span> {/*Posteriormente pegar a primeira letra do nome em CAPS*/}
                                        </div>
                                        <span className="text-2xl mb-2">Person1</span>
                                    </div>
                                    <CardInfo Icon={FaDollarSign} text="Total Gasto" value="R$ 1820.00" />
                                    <CardInfo Icon={LuShoppingBag} text="Total de Pedidos" value="8" />
                                    <Button Icon={GoPlus} text="Criar novo pedido" className="w-100" action={() => navigate("/notes")} />
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col mt-15 gap-4">
                            <span className="text-2xl pl-1">Pedidos Anteriores</span>
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                            <CardOrders />
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
import type { IconType } from "react-icons";
import { FaPix } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { useNavigate } from "react-router-dom";



type Itens = {
    steak?: string,
    weight?: number
}

type Orders = {
    date?: string,
    value?: number,
    itens?: Itens[],
    obs?: string,
    Icon?: string
}

type CardOrdersProps = {
    OrdersInfo?: Orders
}

export function CardOrders({OrdersInfo}: CardOrdersProps) {

    const paymentIcons: { [key: string]: IconType } = {
        pix: FaPix,
        cash: FaMoneyBill,
        card: FaCreditCard
    };

    const Icon = paymentIcons[OrdersInfo?.Icon ?? ""] ?? FaMoneyBill;
    const navigate = useNavigate()

    const OrdersInfoLenght = (OrdersInfo?.itens?.length ?? 0) > 0



    return (
        <>

            <div onClick={() => OrdersInfoLenght ? navigate("/details-order") : null} className={`rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10 top-8 w-165 ${OrdersInfoLenght ? "hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-500/20 cursor-pointer": ""}`}>
                {OrdersInfoLenght ? (<div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <span className="text-[12px] text-desc">{OrdersInfo?.date}</span>
                            <span className="text-purple-400 text-xl">R$ {OrdersInfo?.value}</span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-sm text-desc mb-2">Itens:</span>
                            <div className="grid grid-cols-3 items-center gap-2 w-130">
                                {OrdersInfo?.itens?.map(items => {
                                    return (
                                        <div className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                            {items.steak} ({items.weight} Kg)
                                        </div>
                                    )
                                })}
                            </div>
                            <span className="mt-4 text-sm text-desc italic">"{OrdersInfo?.obs}"</span>
                        </div>
                    </div>
                    <div className="px-4 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center">
                        <Icon className="text-purple-400 w-5 h-5" />
                    </div>
                </div>) :
                    (<div className="flex flex-col items-center justify-center gap-4">
                        <LuShoppingBag className="text-icons text-6xl" />
                        <span className="text-desc">Nenhum pedido registrado</span>
                    </div>
                    )}
            </div>
        </>
    )
}
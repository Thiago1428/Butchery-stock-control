import { InputCreateNote } from "../components/InputCreateNote"
import { Return } from "../components/Return"
import { CiSearch } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { FaPix } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrdersService } from "../services/api";


export function History() {


    const [userFilter, setUserFilter] = useState<string>("")
    const [paymentFilter, setPaymentFilter] = useState<string>("")

    const [orders, setOrders] = useState<any[]>([])

    const paymentIcons: { [key: string]: IconType } = {
        pix: FaPix,
        cash: FaMoneyBill,
        card: FaCreditCard
    };

    const navigate = useNavigate()

    useEffect(() => {
        OrdersService.getAll().then(data => {
            setOrders(data)
        })
    }, [])

    const paymentMapping: { [key: string]: string } = {
        'dinheiro': 'cash',
        'pix': 'pix',
        'cartao': 'card',
    }

    const filteredOrders = orders.filter(order => {
        const matchesUser = (order.customer_name || "").toLowerCase().includes(userFilter.toLowerCase()) ||
            (order.obs || "").toLowerCase().includes(userFilter.toLowerCase());

        const matchesPayment = (!paymentFilter || paymentFilter === "todos")
            ? true
            : order.payment_method === paymentMapping[paymentFilter];

        return matchesUser && matchesPayment;
    })



    return (
        <>
            <main className="flex w-screen min-h-screen h-full p-0 m-0 text-white">
                <div className="w-full h-full flex flex-col items-center mb-4">
                    <div className="flex flex-col gap-2 mt-12">
                        <div>
                            <Return />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-2xl">Histórico</span>
                            <span className="text-[16px] text-desc">Todos os pedidos registrados</span>
                        </div>
                        <div className="mb-6 w-250 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                            <div className="flex flex-row justify-between gap-8">
                                <div className="w-full">
                                    <InputCreateNote
                                        value={userFilter}
                                        onChange={(e) => setUserFilter(e.target.value)}
                                        Icon={CiSearch}
                                        name="Pesquisar"
                                        type="user"
                                        placeholder="Busque por um cliente ou observação"
                                        content={[...new Set(orders.map(item => item.customer_name))].map(name => ({ name }))}
                                    />
                                </div>
                                <div className="w-full">
                                    <InputCreateNote
                                        Icon={GoCreditCard}
                                        name="Método de pagamento"
                                        type="payment"
                                        value={paymentFilter}
                                        onChange={(e) => setPaymentFilter(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-purple-500/20 flex flex-row justify-between items-center">
                                <div>
                                    <span className="text-desc">{filteredOrders.length > 1 ? `${filteredOrders.length} pedidos encontrados` : `${filteredOrders.length} pedido encontrado`}</span>
                                </div>
                                <div>
                                    <span className="text-purple-400 text-xl">Total: R$ {orders.reduce((acc, item) => acc + item.total_value, 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {filteredOrders.length === 0 && <span className="text-desc text-center mt-4">Nenhum pedido encontrado</span>}
                            {filteredOrders.map(item => {
                                const IconComponent = paymentIcons[item.payment_method];
                                const date = item.created_at ? new Date(item.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data desconhecida';

                                return (
                                    <div onClick={() => navigate(`/details-order/${item.id}`)} key={item.id} className="rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] border cursor-pointer border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-500/20">
                                        <div className="p-6 w-full flex flex-row items-center justify-between ">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xl">{item.customer_name || "Cliente Desconhecido"}</span>
                                                    <span className="text-[14px] text-desc">{date}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {item.items && item.items.map((steaks: any, index: number) => {
                                                        return (
                                                            <div key={`${item.id}-${index}`} className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                                                <span>{steaks.steak_name || "Carne"} ({steaks.weight} kg)</span>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                                <div>
                                                    <span className="text-[14px] text-desc italic">{item.obs && `"${item.obs}"`}</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col h-full text-center items-end gap-2">
                                                <div>
                                                    <span className="text-purple-400 text-2xl">R$ {item.total_value.toFixed(2)}</span>
                                                </div>
                                                {item.payment_method === "cash" &&
                                                    (<div>
                                                        <span className="text-[14px] text-desc">Troco: R$ {(item.payment_received - item.total_value).toFixed(2)}</span>
                                                    </div>
                                                    )
                                                }
                                                <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center">
                                                    {IconComponent && <IconComponent className="text-purple-400 w-5 h-5" />}
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                )
                            })}

                        </div>

                    </div>
                </div>
            </main>
        </>
    )
}
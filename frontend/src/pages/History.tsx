import { InputCreateNote } from "../components/InputCreateNote"
import { Return } from "../components/Return"
import { CiSearch } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { FaPix } from "react-icons/fa6";
import { FaMoneyBill } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


export function History() {


    const [userFilter, setUserFilter] = useState<string>("")
    const [paymentFilter, setPaymentFilter] = useState<string>("")

    const paymentIcons: { [key: string]: IconType } = {
        pix: FaPix,
        cash: FaMoneyBill,
        card: FaCreditCard
    };

    const navigate = useNavigate()



    const Orders = [
        {
            name: "Thiago",
            date: "20 de novembro de 2025",
            value: 1943,
            received: 0,
            Icon: "pix",
            itens: [
                { steak: "Picanha", weight: 4 },
                { steak: "Costela", weight: 2 },
                { steak: "Filé", weight: 1.2 },
            ],
            obs: "Entregar dia 21 de novembro",
            id: 1
        },
        {
            name: "Mariana",
            date: "15 de outubro de 2025",
            value: 870,
            received: 200,
            Icon: "card",
            itens: [
                { steak: "Picanha", weight: 2.5 },
                { steak: "Alcatra", weight: 1 }
            ],
            obs: "Cliente prefere após as 18h",
            id: 2
        },
        {
            name: "Carlos",
            date: "2 de dezembro de 2025",
            value: 1240,
            received: 1260,
            Icon: "cash",
            itens: [
                { steak: "Costela", weight: 3 },
                { steak: "Maminha", weight: 1.5 }
            ],
            obs: "Retirada no balcão",
            id: 3
        },
        {
            name: "Fernanda",
            date: "8 de setembro de 2025",
            value: 430,
            received: 0,
            Icon: "pix",
            itens: [
                { steak: "Filé", weight: 0.8 }
            ],
            obs: "Entrega urgente",
            id: 4
        },
        {
            name: "João Pedro",
            date: "12 de dezembro de 2025",
            value: 3100,
            received: 500,
            Icon: "card",
            itens: [
                { steak: "Picanha", weight: 5 },
                { steak: "Costela", weight: 4 },
                { steak: "Maminha", weight: 2 }
            ],
            obs: "Pagamento restante na entrega",
            id: 5
        },
        {
            name: "Larissa",
            date: "5 de agosto de 2025",
            value: 980,
            received: 0,
            Icon: "pix",
            itens: [
                { steak: "Alcatra", weight: 2 },
                { steak: "Filé", weight: 1 }
            ],
            obs: "Confirmar endereço antes de entregar",
            id: 6
        },
        {
            name: "Ricardo",
            date: "19 de julho de 2025",
            value: 1540,
            received: 1540,
            Icon: "cash",
            itens: [
                { steak: "Picanha", weight: 3 },
                { steak: "Filé", weight: 1.3 }
            ],
            obs: "Cliente frequente",
            id: 7
        },
        {
            name: "Camila",
            date: "10 de maio de 2025",
            value: 760,
            received: 100,
            Icon: "card",
            itens: [
                { steak: "Maminha", weight: 1.4 },
                { steak: "Costela", weight: 1.8 }
            ],
            obs: "Enviar nota fiscal",
            id: 8
        },
        {
            name: "Gabriel",
            date: "3 de abril de 2025",
            value: 2240,
            received: 0,
            Icon: "pix",
            itens: [
                { steak: "Picanha", weight: 4 },
                { steak: "Alcatra", weight: 2 }
            ],
            obs: "Pedido grande",
            id: 9
        },
        {
            name: "Isabela",
            date: "17 de fevereiro de 2025",
            value: 550,
            received: 550,
            Icon: "cash",
            itens: [
                { steak: "Filé", weight: 1 }
            ],
            obs: "Pagar entrega",
            id: 10
        }
    ]

    const paymentMapping: { [key: string]: string } = {
        'dinheiro': 'cash',
        'pix': 'pix',
        'cartao': 'card',
    }

    const filteredOrders = Orders.filter(order => {
        const matchesUser = order.name.toLowerCase().includes(userFilter.toLowerCase()) ||
            order.obs.toLowerCase().includes(userFilter.toLowerCase());

        const matchesPayment = (!paymentFilter || paymentFilter === "todos")
            ? true
            : order.Icon === paymentMapping[paymentFilter];

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
                                        content={[...new Set(Orders.map(item => item.name))].map(name => ({ name }))}
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
                                    <span className="text-purple-400 text-xl">Total: R$ {Orders.reduce((acc, item) => acc + item.value, 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            {filteredOrders.map(item => {
                                const IconComponent = paymentIcons[item.Icon];
                                return (
                                    <div onClick={() => navigate("/details-order")} key={item.id} className="rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] border cursor-pointer border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-purple-500/20">
                                        <div className="p-6 w-full flex flex-row items-center justify-between ">
                                            <div className="flex flex-col gap-3">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-xl">{item.name}</span>
                                                    <span className="text-[14px] text-desc">{item.date}</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {item.itens.map((steaks, index) => {
                                                        return (
                                                            <div key={`${item.id}-${index}`} className="px-3 py-1 min-w-40 justify-center inline-flex rounded-lg bg-purple-600/10 border border-purple-500/20 text-sm">
                                                                <span>{steaks.steak} ({steaks.weight} kg)</span>
                                                            </div>
                                                        )
                                                    })}

                                                </div>
                                                <div>
                                                    <span className="text-[14px] text-desc italic">"{item.obs}"</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col h-full text-center items-end gap-2">
                                                <div>
                                                    <span className="text-purple-400 text-2xl">R$ {item.value.toFixed(2)}</span>
                                                </div>
                                                {item.Icon === "cash" &&
                                                    (<div>
                                                        <span className="text-[14px] text-desc">Troco: R$ {(item.received - item.value).toFixed(2)}</span>
                                                    </div>
                                                    )
                                                }
                                                <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex flex-col items-center justify-center">
                                                    <IconComponent className="text-purple-400 w-5 h-5" />
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
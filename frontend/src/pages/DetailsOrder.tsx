import { CardInfoDetails } from "../components/CardInfoDetails";
import { Return } from "../components/Return";
import { Trash } from "../components/Trash";
import { LuUser } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { GoCreditCard } from "react-icons/go";
import { FaDollarSign } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { OrdersService, type OrderItem, type Order, CustomersService, type Customer } from "../services/api";



export function DetailsOrder() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [itens, setItens] = useState<OrderItem[]>([])
    const [order, setOrder] = useState<Order | null>(null)
    const [customer, setCustomer] = useState<Customer | null>(null)

    const deleteOrder = async () => {
        await OrdersService.delete(Number(id))
        navigate(-1)
    }

    useEffect(() => {
        if (id) {
            OrdersService.getById(Number(id)).then((data) => {
                setOrder(data)
                if (data.items) {
                    setItens(data.items)
                }
                if (data.customer_id) {
                    CustomersService.getById(data.customer_id).then((customerData) => {
                        setCustomer(customerData)
                    })
                }
            })
        }
    }, [id])


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
                            <span className="text-desc text-[16px]">#{order?.id}</span>
                        </div>
                        <div className="flex items-center">
                            <Trash action={deleteOrder} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>
                            <CardInfoDetails Icon={LuUser} name="Cliente" text={customer?.name || '...'} />
                        </div>
                        <div className="flex flex-row w-full gap-6">
                            <CardInfoDetails Icon={CiCalendar} name="Data" text={order?.created_at ? new Date(order.created_at).toLocaleDateString() : '...'} className="text-white" />
                            <CardInfoDetails Icon={GoCreditCard} name="Forma de Pagamento" text={order?.payment_method ? ({ 'pix': 'Pix', 'cash': 'Dinheiro', 'card': 'Cartão de crédito' }[order.payment_method] || order.payment_method) : '...'} className="text-white" />
                        </div>
                        <CardInfoDetails
                            name="Itens de pedido"
                            ExtraContent={
                                itens.map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[18px] text-white">{item.steak_name || 'Carne'}</span>
                                            <span className="text-desc text-[14px]">R$ {item.unit_price}/kg x {item.weight}kg</span>
                                        </div>
                                        <div>
                                            <span>R$ {(item.subtotal).toFixed(2)}</span>
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
                                        <span className="text-xl text-purple-400">R$ {(order?.total_value || 0).toFixed(2)}</span>
                                    </div>
                                </>
                            } />
                        <CardInfoDetails name="Observação" text={order?.obs ? `"${order.obs}"` : '"Sem observações"'} className="text-[16px] text-desc italic" />
                    </div>

                </div>
            </main>
        </>
    )
}
import { Button } from "../components/Button";
import { Return } from "../components/Return";
import { FaDollarSign } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
import { GoPlus } from "react-icons/go";
import { CardInfo } from "../components/CardInfo";
import { CardOrders } from "../components/CardOrders";
import { useNavigate, useParams } from "react-router-dom";
import { CustomersService, type Customer, type Order, OrdersService } from "../services/api";
import { useEffect, useState } from "react";


export function Profile() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [customer, setCustomer] = useState<Customer | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (id) {
            CustomersService.getById(Number(id)).then((data) => {
                setCustomer(data);
            });

            OrdersService.getByCustomer(Number(id)).then((data) => {
                setOrders(data);
            });
        }
    }, [id]);

    if (!customer) {
        return (
            <main className="w-screen min-h-screen h-full p-0 m-0 font-display bg-(--bg-primary) text-white flex items-center justify-center">
                <span>Carregando...</span>
            </main>
        )
    }

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
                                            <span className="text-3xl">{customer.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <span className="text-2xl mb-2">{customer.name}</span>
                                    </div>
                                    <CardInfo
                                        Icon={FaDollarSign}
                                        text="Total Gasto"
                                        value={new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(customer.total_spent || 0)}
                                    />
                                    <CardInfo
                                        Icon={LuShoppingBag}
                                        text="Total de Pedidos"
                                        value={String(customer.orders_count || 0)}
                                    />
                                    <Button Icon={GoPlus} text="Criar novo pedido" className="w-100" action={() => navigate("/notes")} />
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-col mt-15 gap-4">
                            <span className="text-2xl pl-1">Pedidos Anteriores</span>
                            {orders.length > 0 ? (
                                orders.map((order) => (
                                    <CardOrders
                                        key={order.id}
                                        OrdersInfo={{
                                            id: order.id,
                                            date: order.created_at ? new Date(order.created_at).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Data desconhecida',
                                            value: order.total_value,
                                            Icon: order.payment_method === 'pix' ? 'pix' : 'card',
                                            itens: order.items?.map(item => ({
                                                steak: item.steak_name || `Carne ${item.steak_id}`,
                                                weight: item.weight
                                            })) || [],
                                            obs: order.obs || '',
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="rounded-2xl  bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10 w-165 h-40 flex flex-col items-center justify-center gap-4">
                                    <LuShoppingBag className="text-icons text-6xl" />
                                    <span className="text-desc">Nenhum pedido registrado</span>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </main>
        </>
    )
}
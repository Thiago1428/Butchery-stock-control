import { Return } from "../components/Return";
import { LuUser } from "react-icons/lu";
import { Modal } from "../components/Modal";
import { CiCalendar } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegClipboard } from "react-icons/fa";
import { InputCreateNote } from "../components/InputCreateNote";
import { useEffect, useState } from "react";
import { Trash } from "../components/Trash";
import { Button } from "../components/Button";
import { GoPlus } from "react-icons/go";
import { IoRemove } from "react-icons/io5";
import { CustomersService, type Customer, SteaksService, type Steak, type CreateOrderPayload } from "../services/api";
import { OrdersService } from "../services/api";


export function Notes() {

    interface CartItem extends Steak {
        weight?: number
    }

    const [list, setList] = useState<CartItem[]>([])
    const [payment, setPayment] = useState<string>("")
    const [value, setValue] = useState<number>(0)
    const [change, setChange] = useState<number>(0)
    const [searchSteak, setSearchSteak] = useState<string>("")
    const [viewAll, setViewAll] = useState<boolean>(false)
    const [customerFilter, setCustomerFilter] = useState<string>("")
    const [obs, setObs] = useState<string>("")
    const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0])
    const [showModal, setShowModal] = useState(false)
    const [costumers, setCostumers] = useState<Customer[]>([])
    const [steaks, setSteaks] = useState<Steak[]>([])


    async function HandleSubmit(e: React.FormEvent) {
        e.preventDefault()

        const customer = costumers.find((customer) => customer.name === customerFilter)

        if (!payment) {
            alert("Selecione uma forma de pagamento!")
            return
        }

        if (!customer) {
            alert("Selecione um cliente válido!")
            return
        }

        const paymentMap: Record<string, string> = {
            "dinheiro": "cash",
            "pix": "pix",
            "cartão": "card"
        }

        const payload: CreateOrderPayload = {
            customer_id: customer.id,
            total_value: value,
            payment_method: paymentMap[payment] || payment,
            payment_received: change,
            obs: obs,
            created_at: new Date(date).toISOString(),
            items: list.map((item) => ({
                steakId: item.id,
                weight: item.weight || 1,
                subtotal: item.price * (item.weight || 1),
            })),
        }

        try {
            await OrdersService.create(payload)
            setShowModal(true)
            setList([])
            setPayment("")
            setCustomerFilter("")
            setObs("")
            setDate(new Date().toISOString().split('T')[0])
        } catch (error) {
            console.error(error)
            alert("Erro ao criar pedido!")
        }

    }


    useEffect(() => {
        CustomersService.getAll().then((data) => {
            setCostumers(data)
        })
        SteaksService.getAll().then((data) => {
            setSteaks(data)
        })
    }, [])


    useEffect(() => {
        const total = list.reduce((acc, item) => {
            return acc + (item.price * (item.weight ?? 1))
        }, 0)
        setValue(total)
    }, [list])



    return (
        <>
            <main className="flex w-screen min-h-screen h-full p-0 m-0">
                <div className="w-full h-full flex flex-col items-center text-white">
                    <form onSubmit={HandleSubmit} className="flex flex-row">
                        <div className="flex flex-col w-150 mt-12">
                            <div className="flex flex-col gap-2">
                                <Return />
                                <div className="flex flex-col gap-2">
                                    <span className="text-2xl">Criar Pedido</span>
                                    <span className="text-[16px] text-desc">Registre um novo pedido para o cliente</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-8 mt-4">
                                <div className="flex flex-col gap-8 w-200 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                    <div className="flex flex-row justify-between gap-8 items-center">
                                        <InputCreateNote
                                            Icon={LuUser}
                                            name="Clientes"
                                            type="user"
                                            content={costumers}
                                            placeholder="Procure um cliente"
                                            value={customerFilter}
                                            onChange={(e) => setCustomerFilter(e.target.value)}
                                        />
                                        <InputCreateNote
                                            Icon={CiCalendar}
                                            name="Data"
                                            type="date"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                        />
                                    </div>
                                    <InputCreateNote
                                        Icon={FaRegClipboard}
                                        name="Observação"
                                        type="obs"
                                        value={obs}
                                        onChange={(e) => setObs(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 w-200 text-white rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                    <div>
                                        <span className="text-xl">Selecione as carnes</span>
                                    </div>
                                    <div className="relative">
                                        <input value={searchSteak} onChange={(e) => setSearchSteak(e.target.value)} type="text" placeholder="Buscar carne..." className="w-full px-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600" />
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                                            <CiSearch className="w-5 h-5" strokeWidth={1.5} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 overflow-y-auto">
                                        {steaks.filter(SearchSteak => SearchSteak.name.toLowerCase().includes(searchSteak.toLowerCase()))
                                            .slice(0, viewAll ? steaks.length : 6)
                                            .map(item => {
                                                const isAdded = list.some(steak => steak.id === item.id)
                                                return (
                                                    <div className="min-w-fit w-full h-20">
                                                        <button
                                                            key={item.id}
                                                            type="button"
                                                            className={`flex flex-col justify-center p-4 w-full h-full rounded-xl border transition-all duration-300 text-left ${isAdded ? 'bg-purple-600/20 border-purple-500/50 opacity-50 cursor-not-allowed' : 'bg-purple-600/10 border-purple-500/20 hover:bg-purple-600/20 hover:border-purple-500/40 cursor-pointer'}`}
                                                            onClick={() => !isAdded && setList([...list, item])}
                                                            disabled={isAdded}
                                                        >
                                                            <span>{item.name}</span>
                                                            <span className="text-sm text-purple-400">R$ {item.price}/kg</span>
                                                        </button>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    {(() => {
                                        const filtered = steaks.filter(SearchSteak => SearchSteak.name.toLowerCase().includes(searchSteak.toLowerCase()))
                                        return filtered.length > 6 && (
                                            <div className="w-full mt-1">
                                                <button
                                                    type="button"
                                                    onClick={() => setViewAll(!viewAll)}
                                                    className="w-full py-2 px-4 rounded-xl bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/20 hover:border-purple-500/40 transition-all duration-300 text-purple-400 flex items-center justify-center gap-2 cursor-pointer"
                                                >
                                                    <div className="flex flex-row items-center justify-center gap-2">
                                                        {viewAll ? <IoRemove className="w-5 h-5" /> : <GoPlus className="w-5 h-5" />}
                                                        <span> {viewAll ? `Ver menos (6)` : `Ver tudo (${filtered.length})`}</span>
                                                    </div>
                                                </button>
                                            </div>
                                        )
                                    })()}
                                </div>
                                <div className="flex flex-col gap-8 w-200 text-white rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                                    <div>
                                        <span className="text-xl">Itens adicionados</span>
                                    </div>
                                    <div className="flex flex-col w-full h-full gap-4">
                                        {list.map((item, index) => {
                                            const final_price = (item.weight ?? 1) * item.price
                                            return (
                                                <div id={String(item.id)} className="flex flex-row justify-between w-full items-center gap-4 p-4 rounded-xl bg-purple-600/10 border border-purple-500/20">
                                                    <div className="flex flex-col gap-1">
                                                        <span>{item.name}</span>
                                                        <span className="text-[14px] text-desc">R$ {item.price}/kg</span>
                                                    </div>
                                                    <div className="flex flex-row gap-12">
                                                        <div className="flex flex-row w-36 items-center gap-2">
                                                            <input type="number" onChange={(e) => {
                                                                const newList = [...list]
                                                                newList[index].weight = parseFloat(e.target.value) || 0
                                                                setList(newList)

                                                            }} defaultValue={1} min={0} step={0.01} className="w-full dark:scheme-dark px-3 py-2 rounded-lg bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white text-center" />
                                                            <span className="text-desc text-[14px]">kg</span>
                                                        </div>
                                                        <div className="w-40 gap-4 text-right flex flex-row items-center">
                                                            <div className="w-30 overflow-scroll">
                                                                <span className="w-full text-[18px] text-purple-400">R${final_price.toFixed(2)}</span>
                                                            </div>
                                                            <div className="flex flex-row items-center">
                                                                <Trash height="8" action={() => setList(list.filter(steak => steak.id !== item.id))} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="ml-60 mt-40 flex flex-col gap-4 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 sticky top-8 h-fit w-100">
                            <div>
                                <span className="text-xl mb-4">Pagamento</span>
                            </div>
                            <div className="flex flex-col">
                                {(["dinheiro", "pix", "cartão"] as const).map(type => (
                                    <button
                                        type="button"
                                        onClick={() => setPayment(type)}
                                        className={`cursor-pointer w-full p-4 mb-4 rounded-xl border transition-all duration-300 capitalize ${payment == type ? "bg-purple-600/20 border-purple-500/50" : "bg-purple-600/10 border-purple-500/20 hover:bg-purple-600/15"}`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                            {payment == "dinheiro" &&
                                <div className="flex flex-col gap-2">
                                    <span className="text-desc text-[14px] pl-1">Valor Recebido</span>
                                    <input type="number" min={0} step={0.01} onChange={(e) => setChange(isNaN(parseFloat(e.target.value)) ? 0 : parseFloat(e.target.value))} placeholder="R$ 0.00" className="w-full px-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white dark:scheme-dark" />
                                </div>
                            }
                            <div className="flex flex-col items-center gap-8 border-t border-purple-500/20">
                                <div className="flex flex-row w-full justify-between items-center mt-4">
                                    <div className="flex flex-col gap-4">
                                        <span className="text-desc">Total:</span>
                                        {payment == "dinheiro" && (
                                            <span className="text-desc text-[14px]">Troco:</span>
                                        )
                                        }
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <span className="text-2xl text-purple-400">R$ {value.toFixed(2)}</span>
                                        {payment == "dinheiro" &&
                                            <span className="text-xl text-green-400">R$ {(change - value).toFixed(2)}</span>
                                        }
                                    </div>

                                </div>
                                <div>
                                    <Button text="Salvar nota" type="submit" />
                                </div>
                            </div>
                        </div>
                    </form> {/*Form */}

                </div>
            </main>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Sucesso!"
                message="O pedido foi criado com sucesso e registrado no histórico."
                type="success"
            />
        </>
    )
}
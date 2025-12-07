import { Return } from "../components/Return";
import { LuUser } from "react-icons/lu";
import { CiCalendar } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { FaRegClipboard } from "react-icons/fa";
import { InputCreateNote } from "../components/InputCreateNote";
import { useEffect, useState } from "react";
import { Trash } from "../components/Trash";
import { Button } from "../components/Button";
import { GoPlus } from "react-icons/go";
import { IoRemove } from "react-icons/io5";




interface Steak {
    name: string,
    id: number,
    price: number,
    weigth?: number
}


export function Notes() {

    const [list, setList] = useState<Steak[]>([])
    const [payment, setPayment] = useState<string>("")
    const [value, setValue] = useState<number>(0)
    const [change, setChange] = useState<number>(0)
    const [searchSteak, setSearchSteak] = useState<string>("")
    const [viewAll, setViewAll] = useState<boolean>(false)

    const costumers = [
        { name: "Thiago" },
        { name: "Mariana" },
        { name: "Gabriel" },
        { name: "Fernanda" },
        { name: "Lucas" },
        { name: "Juliana" },
        { name: "Rafael" },
        { name: "Camila" },
        { name: "Bruno" },
        { name: "Ana Clara" },
        { name: "Matheus" },
        { name: "Letícia" },
        { name: "Gustavo" },
        { name: "Beatriz" },
        { name: "Vinícius" },
        { name: "Aline" },
        { name: "Diego" },
        { name: "Larissa" },
        { name: "João Pedro" },
        { name: "Carolina" },
        { name: "Eduardo" },
        { name: "Bianca" },
        { name: "Felipe" },
        { name: "Isabela" },
        { name: "André" },
        { name: "Natália" },
        { name: "Pedro Henrique" },
        { name: "Bruna" },
        { name: "Rodrigo" },
        { name: "Sofia" },
        { name: "Leonardo" },
        { name: "Daniela" },
        { name: "Samuel" },
        { name: "Patrícia" },
        { name: "Henrique" },
        { name: "Roberta" },
        { name: "Caio" },
        { name: "Nicole" },
        { name: "Alexandre" },
        { name: "Helena" },
        { name: "Marcelo" },
        { name: "Melissa" },
        { name: "Vitor" },
        { name: "Jéssica" },
        { name: "Igor" },
        { name: "Renata" },
        { name: "Arthur" },
        { name: "Clara" },
        { name: "Miguel" },
        { name: "Alice" }
    ]

    const steaks: Steak[] = [
        { name: "Picanha", id: 1, price: 55 },
        { name: "Costela", id: 2, price: 89 },
        { name: "Contrafilé", id: 3, price: 123 },
        { name: "Contrafilé", id: 1, price: 89 },
        { name: "Picanha", id: 2, price: 129 },
        { name: "Alcatra", id: 3, price: 84 },
        { name: "Maminha", id: 4, price: 79 },
        { name: "Fraldinha", id: 5, price: 82 },
        { name: "Costela Bovina", id: 6, price: 58 },
        { name: "Cupim", id: 7, price: 65 },
        { name: "Patinho", id: 8, price: 69 },
        { name: "Coxão Mole", id: 9, price: 72 },
        { name: "Coxão Duro", id: 10, price: 59 },
        { name: "Lagarto", id: 11, price: 61 },
        { name: "Filé Mignon", id: 12, price: 149 },
        { name: "Acém", id: 13, price: 41 },
        { name: "Peito Bovino", id: 14, price: 37 },
        { name: "Rabada", id: 15, price: 49 },
        { name: "Paleta", id: 16, price: 44 },
        { name: "Músculo", id: 17, price: 39 },
        { name: "T-Bone", id: 18, price: 139 },
        { name: "Prime Rib", id: 19, price: 142 },
        { name: "Short Rib", id: 20, price: 138 },
        { name: "Ancho", id: 21, price: 135 },
        { name: "Denver Steak", id: 22, price: 128 },
        { name: "Brisket", id: 23, price: 55 },
        { name: "Bife de Chorizo", id: 24, price: 133 },
        { name: "Bisteca Bovina", id: 25, price: 47 },
        { name: "Carne Moída", id: 26, price: 32 },
        { name: "Costelinha Suína", id: 27, price: 39 },
        { name: "Pernil Suíno", id: 28, price: 29 },
        { name: "Lombo Suíno", id: 29, price: 34 },
        { name: "Bisteca Suína", id: 30, price: 28 },
        { name: "Filé Suíno", id: 31, price: 37 },
        { name: "Barriga Suína", id: 32, price: 33 },
        { name: "Linguiça Toscana", id: 33, price: 24 },
        { name: "Linguiça Calabresa", id: 34, price: 26 },
        { name: "Linguiça Artesanal", id: 35, price: 38 },
        { name: "Cordeiro Pernil", id: 36, price: 115 },
        { name: "Cordeiro Carré", id: 37, price: 145 },
        { name: "Cordeiro Paleta", id: 38, price: 119 },
        { name: "Frango Peito", id: 39, price: 18 },
        { name: "Frango Coxa e Sobrecoxa", id: 40, price: 16 },
        { name: "Frango Asa", id: 41, price: 17 },
        { name: "Frango Filé Sassami", id: 42, price: 21 },
        { name: "Frango Coração", id: 43, price: 34 },
        { name: "Peru Peito", id: 44, price: 31 },
        { name: "Peru Coxa", id: 45, price: 29 },
        { name: "Carne de Sol", id: 46, price: 52 },
        { name: "Carne Seca", id: 47, price: 55 },
        { name: "Charque", id: 48, price: 49 },
        { name: "Bucho Bovino", id: 49, price: 27 },
        { name: "Tripas", id: 50, price: 23 }

    ]

    useEffect(() => {
        const total = list.reduce((acc, item) => {
            return acc + (item.price * (item.weigth ?? 1))
        }, 0)
        setValue(total)
    }, [list])



    return (
        <>
            <main className="flex w-screen min-h-screen h-full p-0 m-0">
                <div className="w-full h-full flex flex-col items-center text-white">
                    <div className="flex flex-row"> {/*Form*/}
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
                                        <InputCreateNote Icon={LuUser} name="Clientes" type="user" content={costumers} />
                                        <InputCreateNote Icon={CiCalendar} name="Data" type="date" />
                                    </div>
                                    <InputCreateNote Icon={FaRegClipboard} name="Observação" type="obs" />
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
                                            const final_price = (item.weigth ?? 1) * item.price
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
                                                                newList[index].weigth = parseFloat(e.target.value) || 0
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
                                    <input type="number" defaultValue={0} min={0} step={0.01} onChange={(e) => setChange(parseFloat(e.target.value))} placeholder="R$ 0.00" className="w-full px-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white dark:scheme-dark" />
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
                                    <Button text="Salvar nota" />
                                </div>
                            </div>
                        </div>
                    </div> {/*Form */}

                </div>
            </main>
        </>
    )
}
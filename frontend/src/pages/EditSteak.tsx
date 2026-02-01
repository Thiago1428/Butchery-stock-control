import { GiSteak } from "react-icons/gi";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { InputCreate } from "../components/InputCreate";
import { FaDollarSign } from "react-icons/fa";
import { Return } from "../components/Return";
import { SteaksService } from "../services/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function EditSteak() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")

    useEffect(() => {
        SteaksService.getById(Number(id)).then(data => {
            setName(data.name)
            setPrice(data.price.toString())
        })
    }, [])

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
    
            const formData = new FormData(e.currentTarget)
            const name = formData.get("name-steak") as string
            const price = formData.get("price-steak") as string
    
            if (!name || !price) return
    
            try {
                await SteaksService.update(Number(id), name, Number(price))
                navigate("/steak")
            } catch (error) {
                console.error("Erro ao editar carne", error)
                alert("Erro ao editar carne")
            }
    }

    return (
        <>
            <main className="w-screen h-screen p-0 m-0 font-display bg-(--bg-primary)">

                <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                    <div className="text-white">
                        <div className="flex flex-col gap-3 mt-5">
                            <div className="mb-1">
                                <Return />
                            </div>
                            <span className="text-4xl">Editar carne</span>
                            <span className="text-[16px] text-desc">Edite o nome e o preço da carne no sistema</span>
                        </div>
                        <form onSubmit={HandleSubmit} className="mt-5 flex flex-col gap-2 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                            <div className="flex flex-col gap-8">
                                <InputCreate name="Nome da carne" Icon={GiSteak} placeholder="Ex: Picanha, Contrafilé" nameInput="name-steak" value={name} trade={(e) => setName(e.target.value)} />
                                <InputCreate name="Preço por KG" Icon={FaDollarSign} type="number" placeholder="0.00" nameInput="price-steak" value={price} trade={(e) => setPrice(e.target.value)}/>
                            </div>
                            <Button text="Salvar Carne" type="submit" className="mt-4" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
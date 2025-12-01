import { GiSteak } from "react-icons/gi";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { InputCreate } from "../components/InputCreate";
import { FaDollarSign } from "react-icons/fa";
import { Return } from "../components/Return";


export function CreateSteak() {

    const navigate = useNavigate()

    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate("/steak")
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
                            <span className="text-4xl">Adicionar Carne</span>
                            <span className="text-[16px] text-desc">Adicione uma nova carne ao sistema</span>
                        </div>
                        <form onSubmit={HandleSubmit} className="mt-5 flex flex-col gap-2 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                            <div className="flex flex-col gap-8">
                                <InputCreate name="Nome da carne" Icon={GiSteak} placeholder="Ex: Picanha, Contrafilé" />
                                <InputCreate name="Preço por KG" Icon={FaDollarSign} type="number" placeholder="0.00" />
                            </div>
                            <Button text="Salvar Carne" type="submit" className="mt-4" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
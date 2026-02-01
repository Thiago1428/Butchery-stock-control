import { GoPlus } from "react-icons/go";
import { SteakCard } from "../components/SteakCard";
import { useNavigate } from "react-router-dom";
import { SteaksService, type Steak } from "../services/api";
import { useEffect, useState } from "react";

export function Steak() {

    const [steaks, setSteaks] = useState<Steak[]>([])

    async function loadSteaks() {
        SteaksService.getAll().then(data => {
            setSteaks(data)
        })
    }

    useEffect(() => {
        loadSteaks()
    }, [])


    const navigate = useNavigate()

    return (
        <>
            <main className="flex w-screen min-h-screen h-full p-0 m-0">
                <div className="w-full h-full flex flex-col items-center text-white">
                    <div className="flex flex-row justify-between items-center w-250 pt-20">
                        <div className="flex flex-col gap-2">
                            <span className="text-2xl">Lista de carnes cadastradas</span>
                            <span className="text-desc">Gerencie os preços por kg</span>
                        </div>
                        <button
                            onClick={() => navigate("/create-steak")}
                            className="px-6 py-3 rounded-xl bg-linear-to-r cursor-pointer from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-2"
                        >
                            <GoPlus className="w-5 h-5" />
                            <span>Adicionar carne</span>
                        </button>
                    </div>
                    <div className="flex flex-col mt-10 gap-5">
                        {steaks.length === 0 ? (
                            <span className="text-desc text-[16px] mt-10">Nenhuma carne cadastrada</span>
                        ) : (
                            steaks.map(steak => {
                                return (
                                    <SteakCard key={steak.id} name={steak.name} price={steak.price} id={steak.id} onDelete={loadSteaks} />
                                )
                            })
                        )}
                    </div>

                </div>
            </main>
        </>
    )
}
import { FiUsers } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { GiSteak } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { Card } from "../components/Card";

export function Home() {


    return (
        <>
        
            <main className="flex w-screen h-screen p-0 m-0 font-display bg-(--bg-primary) ">
                <div className="h-full w-full flex flex-col items-center justify-center text-white">
                    <div className="flex w-full max-w-[900px] flex-col rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                        <span className="text-2xl">Ações Rápidas</span>
                        <div className="mt-6 grid w-full grid-cols-2 gap-6">
                            <Card Icon={FiUsers} text="Clientes" page="/customers" />
                            <Card Icon={CiStickyNote} text="Pedidos" page="/notes"/>
                            <Card Icon={GiSteak} text="Carnes" page="/steak"/>
                            <Card Icon={GoHistory} text="Histórico" page="/history"/>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}
import { LuUser } from "react-icons/lu";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";


export function CreateCustomer() {

    const navigate = useNavigate()

    function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        navigate("/customers")
    }

    return (
        <>
            <main className="w-screen h-screen p-0 m-0 font-display bg-(--bg-primary)">

                <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                    <div className="text-white">
                        <div className="flex flex-col gap-3 mt-5">
                            <span className="text-4xl">Criar Cliente</span>
                            <span className="text-[16px] text-desc">Adicione um novo cliente ao sistema</span>
                        </div>
                        <form onSubmit={HandleSubmit} className="mt-5 flex flex-col gap-2 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                            <span className="text-[15px] pl-1 text-desc">Nome do cliente</span>
                            <div className="relative flex flex-row items-center w-150 rounded-xl">
                                <div className="absolute left-4">
                                    <LuUser className="text-icons w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    name="name-customer"
                                    id="customer"
                                    placeholder="Digite o nome completo"
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600"
                                />
                            </div>
                            <Button text="Salvar Cliente" type="submit" className="mt-4" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
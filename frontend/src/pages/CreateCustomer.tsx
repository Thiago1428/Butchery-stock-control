import { LuUser } from "react-icons/lu";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { InputCreate } from "../components/InputCreate";
import { Return } from "../components/Return";
import { CustomersService } from "../services/api";

export function CreateCustomer() {

    const navigate = useNavigate()

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const name = formData.get("name-customer") as string

        if (!name) return

        try {
            await CustomersService.create(name)
            navigate("/customers")
        } catch (error) {
            console.error("Erro ao criar cliente", error)
            alert("Erro ao criar cliente")
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
                            <span className="text-4xl">Criar Cliente</span>
                            <span className="text-[16px] text-desc">Adicione um novo cliente ao sistema</span>
                        </div>
                        <form onSubmit={HandleSubmit} className="mt-5 flex flex-col gap-2 rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-8 border border-purple-500/20 shadow-lg shadow-purple-500/10">
                            <InputCreate name="Nome do Cliente" Icon={LuUser} placeholder="Digite o nome completo" nameInput="name-customer" />
                            <Button text="Salvar Cliente" type="submit" className="mt-4" />
                        </form>
                    </div>
                </div>
            </main>
        </>
    )
}
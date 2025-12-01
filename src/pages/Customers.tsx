import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { CustomersCard } from "../components/CustomersCard";
import { GoPlus } from "react-icons/go";

export function Customers() {
    const navigate = useNavigate();

    const clients = [
        { name: "Person1", id: 1 },
        { name: "Person2", id: 2 },
        { name: "Person3", id: 3 },
        { name: "Person4", id: 4 },

    ] //Teste de criação automatica


    return (
        <>
            <main className="flex w-screen min-h-screen p-0 m-0 font-display bg-(--bg-primary)">
                <div className="h-full w-full flex flex-col items-center text-white">
                    <div className="flex flex-row w-250 justify-between pt-20">
                        <div className="flex flex-col gap-3">
                            <span className="text-4xl">Clientes</span>
                            <span className="text-[16px] text-desc">Gerencie seus clientes</span>
                        </div>
                        <Button Icon={GoPlus} text="Criar cliente" action={() => navigate("/create-customer")} IconType="font-semibold" textType="font-semibold" />
                    </div>
                    <div className="mt-8 flex flex-col items-center gap-5">
                        {clients.map(item => {
                            return (
                                <CustomersCard id={item.id} name={item.name} />
                            )
                        })}
                    </div>
                </div>
            </main>
        </>
    )
}
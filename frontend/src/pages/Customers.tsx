import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { CustomersCard } from "../components/CustomersCard";
import { GoPlus } from "react-icons/go";
import { CustomersService, type Customer } from "../services/api";
import { useEffect, useState } from "react";

export function Customers() {
    const [clients, setClients] = useState<Customer[]>([])

    const navigate = useNavigate();

    useEffect(() => {
        CustomersService.getAll().then((data) => {
            setClients(data)
        })
    }, [])

    function loadClients() {
        CustomersService.getAll().then((data) => {
            setClients(data)
        })
    }

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
                        {clients.length === 0 ? (
                            <span className="text-desc text-[16px] mt-10">Nenhum cliente cadastrado</span>
                        ) : (
                            clients.map(item => {
                                console.log(item.id)
                                return (
                                <CustomersCard id={item.id} name={item.name} orders_count={Number(item.orders_count)} total_spent={Number(item.total_spent)} onDelete={loadClients} />
                            )
                        })
                        )}
                    </div>
                </div>
            </main>
        </>
    )
}
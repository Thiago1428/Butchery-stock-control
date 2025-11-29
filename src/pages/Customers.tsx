import { Button } from "../components/Button";
import { Customers_card } from "../components/Customers_card";
import { SideBar } from "../components/Sidebar";
import { GoPlus } from "react-icons/go";

export function Customers() {


    return (
        <>
            <main className="flex w-screen h-screen p-0 m-0 font-display bg-(--bg-primary) ">
                <SideBar />
                <div className="h-full w-full flex flex-col items-center text-white">
                    <div className="flex flex-row gap-150 justify-between pt-10">
                        <div className="flex flex-col gap-3">
                            <span className="text-4xl">Clientes</span>
                            <span className="text-[16px] text-desc">Gerencie seus clientes</span>
                        </div>
                        <Button Icon={GoPlus} text="Criar cliente"/>
                    </div>
                    <div className="flex flex-col items-center ">
                        <Customers_card/>
                    </div>
                </div>
            </main>
        </>
    )
}
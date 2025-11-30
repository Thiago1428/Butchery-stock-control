import { Route, Routes, Outlet } from "react-router-dom";

// Importe sua Sidebar (ajuste o caminho se necessário)
import { SideBar } from "../components/Sidebar"; 

import { Home } from "../pages/Home";
import { Customers } from "../pages/Customers";
import { Notes } from "../pages/Notes";
import { Steak } from "../pages/Steak";
import { History } from "../pages/History";
import { CreateCustomer } from "../pages/CreateCustomer";
import { Profile } from "../pages/Profile";

const AppLayout = () => {
    return (
        <div className="flex min-h-screen bg-[#09090b]">
            
            <SideBar />
            <main className="flex-1 transition-all duration-300">
                <Outlet />
            </main>
        </div>
    );
};

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/steak" element={<Steak />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/create-customer" element={<CreateCustomer />} /> 
            </Route>
        </Routes>
    )
}
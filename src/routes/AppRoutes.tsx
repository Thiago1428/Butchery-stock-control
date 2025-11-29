import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Customers } from "../pages/Customers";
import { Notes } from "../pages/Notes";
import { Steak } from "../pages/Steak";
import { History } from "../pages/History";

export function AppRoutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Customers" element={<Customers />} />
                <Route path="/Notes" element={<Notes />} />
                <Route path="/Steak" element={<Steak />} />
                <Route path="/History" element={<History />} />
            </Routes>
        </>

    )

}
import { LuLayoutDashboard } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { CiStickyNote } from "react-icons/ci";
import { GiSteak } from "react-icons/gi";
import { GoHistory } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";





export function SideBar() {
    const menuItems = [
        { id: '/', icon: LuLayoutDashboard, label: 'Dashboard' },
        { id: '/customers', icon: FiUsers, label: 'Clientes' },
        { id: '/notes', icon: CiStickyNote, label: 'Criar Nota' },
        { id: '/steak', icon: GiSteak, label: 'Carnes' },
        { id: '/history', icon: GoHistory, label: 'Histórico' },
    ]
    const currentPage = useLocation()
    const navigate = useNavigate()

    return (
        <>
            <nav className="flex flex-col items-center justify-center h-full w-15 fixed">
                <div className="bg-[#0f0f14] rounded-2xl p-4 border border-purple-500/40 h-120 flex flex-col items-center justify-center gap-10">
                    {menuItems.map(item => {
                        const isActive = currentPage.pathname === item.id
                        const Icon = item.icon
                        return (
                            <button
                                key={item.id}
                                onClick={() => {if(currentPage.pathname != item.id) navigate(item.id)}}
                                className={
                                    `w-12 h-12 cursor-pointer rounded-xl flex items-center justify-center transition-all duration-300 group relative 
                                ${isActive
                                        ? 'bg-purple-600/20 text-purple-400 shadow-lg shadow-purple-500/30'
                                        : 'text-gray-400 hover:text-purple-400 hover:bg-purple-600/10'
                                    }`}
                                title={item.label}
                            >

                                <Icon className="text-4xl" />

                                {isActive && (
                                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-500 rounded-r-full" />
                                )}

                                <div className="text-white absolute left-full ml-4 px-3 py-2 bg-purple-900/90 backdrop-blur-sm text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap border border-purple-500/20">
                                    {item.label}
                                </div>
                            </button>
                        )
                    })}
                </div>

            </nav>
        </>
    )
}
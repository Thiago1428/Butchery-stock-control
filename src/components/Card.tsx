import type { IconType } from "react-icons";
import { useNavigate } from "react-router-dom";

type CardProps = {
    Icon: IconType,
    text: string,
    page: string,
}

export function Card({ Icon, text, page }: CardProps) {
    const navigate = useNavigate()

    return (
        <>
            <button
                className="group relative flex h-[110px] w-full items-center gap-6 overflow-hidden rounded-xl border border-purple-500/20 bg-purple-500/10 p-6 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:border-purple-500/30 hover:bg-purple-500/20 hover:shadow-lg hover:shadow-purple-500/20"
                onClick={() => navigate(page)}
            >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20 transition-colors group-hover:bg-purple-500/30">
                    <Icon className="text-3xl text-purple-300" />
                </div>
                <span className="text-2xl">{text}</span>
                <div className="group-hover:cursor-pointer absolute inset-0 bg-linear-to-r from-purple-600/0 via-purple-600/10 to-purple-600/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </button>
        </>
    )
}
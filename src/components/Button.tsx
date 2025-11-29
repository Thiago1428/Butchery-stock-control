import type { IconType } from "react-icons";

type ButtonProps = {
    Icon?: IconType,
    text: string
}

export function Button({ Icon, text }: ButtonProps) {
    return (
        <>
            <button
                className="min-w-50 max-h-15 p-4 cursor-pointer flex-row justify-center rounded-xl bg-linear-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 flex items-center gap-2">
                {Icon && <Icon className="text-3xl font-semibold" />}

                <span className="font-semibold">{text}</span>
            </button>
        </>
    )
}
import type { IconType } from "react-icons"

type CardInfoDetailsProps = {
    Icon?: IconType,
    name: string,
    text?: string,
    className?: string,
    ExtraContent?: React.ReactNode
}


export function CardInfoDetails({ Icon, name, text, className, ExtraContent }: CardInfoDetailsProps) {
    return (
        <>
            <div className="rounded-2xl bg-linear-to-br from-[#1a1a24] to-[#16161e] p-6 border border-purple-500/20 shadow-lg shadow-purple-500/10 w-full">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-row gap-2 items-center">
                        {Icon && <Icon className="w-6 h-6 text-purple-400" />}
                        <span className="text-lg">{name}</span>
                    </div>
                    <div className={`text-xl ${className ? className : "text-purple-400"}`}>
                        {text}
                        {ExtraContent && <div className="flex flex-col gap-4">{ExtraContent}</div>}
                    </div>
                </div>
            </div>
        </>
    )
}
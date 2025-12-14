import type { IconType } from "react-icons"

type CardInfoProps = {
    Icon: IconType,
    text: string,
    value: string
}

export function CardInfo({ Icon, text, value }: CardInfoProps) {
    return (
        <>
            <div>
                <div className="p-4 rounded-xl bg-purple-600/10 border border-purple-500/20 w-100 h-25 mb-8">
                    <div className="flex flex-row items-center gap-2 mb-4">
                        <Icon className="w-5 h-5 text-purple-400" />
                        <span className="text-[16px] text-desc">{text}</span>
                    </div>
                    <div className="pl-1">
                        <span className="text-2xl text-purple-400">{value}</span>
                    </div>
                </div>
            </div>
        </>
    )
}
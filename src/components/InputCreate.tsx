import type { IconType } from "react-icons"

type InputCreateProps = {
    name: string,
    Icon: IconType,
    type?: string
    placeholder: string
}

export function InputCreate({ name, Icon, type ,placeholder }: InputCreateProps) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[15px] pl-1 text-desc">{name}</span>
            <div className="relative flex flex-row items-center w-150 rounded-xl">
                <div className="absolute left-4">
                    <Icon className="text-icons w-5 h-5" />
                </div>
                <input
                    type={type ?? "text"}
                    name="name-customer"
                    id="customer"
                    placeholder={placeholder}
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600"
                    required
                    step="any"
                />
            </div>
        </div>
    )

}
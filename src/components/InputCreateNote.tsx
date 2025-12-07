import type { IconType } from "react-icons"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

type InputCreateNoteProps = {
    Icon: IconType,
    name: string,
    type: string,
    content?: Array<any>
}

export function InputCreateNote({ Icon, name, type, content }: InputCreateNoteProps) {
    return (
        <>
            <div className="w-full">
                <div className="flex flex-row gap-1">
                    <Icon className="w-5 h-5 text-purple-400" />
                    <span className="text-[16px] text-desc">{name}</span>
                </div>
                <div className="relative flex flex-row items-center mt-2">
                    <div className="flex flex-row w-full">
                        {(() => {
                            switch (type) {
                                case "user":
                                    return (
                                        <div className="w-full">
                                            <Autocomplete
                                                options={content ?? []}
                                                getOptionLabel={(option) => option.name}
                                                popupIcon={null}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder="Selecione um cliente"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                backgroundColor: '#0f0f14',
                                                                color: 'white',
                                                                borderRadius: '0.75rem',
                                                                border: '1px solid rgba(168, 85, 247, 0.2)',
                                                                padding: '0.782rem 1rem',
                                                                minHeight: 'auto',
                                                                '&:hover': {
                                                                    borderColor: 'rgba(168, 85, 247, 0.5)',
                                                                },
                                                                '& fieldset': {
                                                                    border: 'none',
                                                                },
                                                                '& input': {
                                                                    padding: '0 !important',
                                                                    color: 'white',
                                                                    '&::placeholder': {
                                                                        color: '#9ca3af',
                                                                        opacity: 0.7,
                                                                    }
                                                                }
                                                            },
                                                        }}
                                                    />
                                                )}
                                                slotProps={{
                                                    paper: {
                                                        sx: {
                                                            backgroundColor: '#0f0f14',
                                                            color: 'white',
                                                            border: '1px solid rgba(168, 85, 247, 0.2)',
                                                            borderRadius: '0.75rem',
                                                            marginTop: '0.5rem',
                                                            maxHeight: '200px',
                                                            '& .MuiAutocomplete-listbox': {
                                                                maxHeight: '200px',
                                                                padding: '4px 0',
                                                            },
                                                            '& .MuiAutocomplete-option': {
                                                                color: 'white',
                                                                minHeight: '36px',
                                                                padding: '6px 12px',
                                                                fontSize: '14px',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                                                },
                                                                '&[aria-selected="true"]': {
                                                                    backgroundColor: 'rgba(168, 85, 247, 0.3)',
                                                                },
                                                            },
                                                            '& .MuiAutocomplete-noOptions': {
                                                                color: '#9ca3af',
                                                            },
                                                        },
                                                    },
                                                }}
                                            />
                                        </div>
                                    )
                                case "date":
                                    return (
                                        <div className="w-full">
                                            <input 
                                                type="date" 
                                                id="date-input" 
                                                required 
                                                className="pl-2 pr-4 py-3 min-w-60 w-full rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors [&::-webkit-datetime-edit]:text-desc scheme-only-dark"
                                            />
                                        </div>
                                    )
                                case "obs":
                                    return (
                                        <div className="w-full">
                                            <textarea placeholder="Anotações sobre o pedido" className="w-full pl-4 text-[14px] pr-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600 resize-none placeholder:text-[16px]"></textarea>
                                        </div>
                                    )
                                default:
                                    return null
                            }
                        })()}
                    </div>
                </div>
            </div>
        </>
    )
}



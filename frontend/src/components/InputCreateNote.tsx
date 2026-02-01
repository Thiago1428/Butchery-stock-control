import type { IconType } from "react-icons"
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

type InputCreateNoteProps = {
    Icon: IconType,
    name: string,
    type: string,
    content?: Array<any>,
    placeholder?: string,
    value?: string,
    onChange?: (e: any) => void
}

export function InputCreateNote({ Icon, name, type, content, placeholder, value, onChange }: InputCreateNoteProps) {
    return (
        <>
            <div className="w-full">
                <div className="flex flex-row gap-2 items-center">
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
                                                freeSolo
                                                options={content ?? []}
                                                getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                                                value={null}
                                                inputValue={value || ""}
                                                onInputChange={(_event, newInputValue) => {
                                                    if (onChange) {
                                                        onChange({ target: { value: newInputValue } });
                                                    }
                                                }}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        placeholder={placeholder}
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
                                                                },
                                                                '& .MuiAutocomplete-clearIndicator': {
                                                                    color: 'white'
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
                                                value={value}
                                                onChange={onChange}
                                                className="pl-2 pr-4 py-3 min-w-60 w-full rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors [&::-webkit-datetime-edit]:text-desc scheme-only-dark"
                                            />
                                        </div>
                                    )
                                case "obs":
                                    return (
                                        <div className="w-full">
                                            <textarea
                                                placeholder="Anotações sobre o pedido"
                                                value={value}
                                                onChange={onChange}
                                                className="w-full pl-4 text-[14px] pr-4 py-3 rounded-xl bg-[#0f0f14] border border-purple-500/20 focus:border-purple-500/50 outline-none transition-colors text-white placeholder:text-gray-600 resize-none placeholder:text-[16px]"
                                            />
                                        </div>
                                    )
                                case "payment":
                                    return (
                                        <div className="w-full">
                                            <Select
                                                value={value || ""}
                                                onChange={onChange}
                                                displayEmpty
                                                variant="outlined"
                                                sx={{
                                                    width: '100%',
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
                                                    '& .MuiSelect-select': {
                                                        padding: '0 !important',
                                                        color: 'white',
                                                    },
                                                    '& .MuiSvgIcon-root': {
                                                        color: 'white',
                                                    },
                                                }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: '#0f0f14',
                                                            border: '1px solid rgba(168, 85, 247, 0.2)',
                                                            borderRadius: '0.75rem',
                                                            marginTop: '0.5rem',
                                                            maxHeight: '200px',
                                                            '& .MuiMenuItem-root': {
                                                                color: 'white',
                                                                minHeight: '36px',
                                                                padding: '6px 12px',
                                                                fontSize: '14px',
                                                                '&:hover': {
                                                                    backgroundColor: 'rgba(168, 85, 247, 0.2)',
                                                                },
                                                                '&.Mui-selected': {
                                                                    backgroundColor: 'rgba(168, 85, 247, 0.3)',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(168, 85, 247, 0.4)',
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="" disabled sx={{ display: 'none' }}>
                                                    <span style={{ color: '#9ca3af', opacity: 0.7 }}>{placeholder || 'Selecione forma de pagamento'}</span>
                                                </MenuItem>
                                                <MenuItem value="todos">Não filtrar</MenuItem>
                                                <MenuItem value="dinheiro">Dinheiro</MenuItem>
                                                <MenuItem value="pix">Pix</MenuItem>
                                                <MenuItem value="cartao">Cartão</MenuItem>
                                            </Select>
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



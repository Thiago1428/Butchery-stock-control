import { GoArrowLeft } from "react-icons/go";
import { useNavigate } from "react-router-dom";

export function Return(){
    const navigate = useNavigate()
    return(
        <>
            <button className="group flex flex-row gap-1 items-center cursor-pointer" onClick={() => navigate(-1)}>
                <GoArrowLeft className="group-hover:text-purple-400 transition-colors duration-150 text-icons text-2xl"/>
                <span className="text-desc group-hover:text-purple-400 transition-colors duration-150">Voltar</span>
            </button>     
        </>
    )
}
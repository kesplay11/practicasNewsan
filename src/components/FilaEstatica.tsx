  interface FilaEstaticaProps{
        onImClick? : () => void;
    }

export default function FilaEstatica({onImClick} : FilaEstaticaProps){

  
    return(
        <div className="flex flex-row items-center justify-around p-4 bg-black text-white text-xl">
            <h2>MODELO</h2>
            <h2
                className="cursor-pointer underline hover:text-blue-300"
                onClick={onImClick}
            >
            IM
            </h2>
            <h2>PROD</h2>
            <h2>CLI</h2>
        </div>
    )
}
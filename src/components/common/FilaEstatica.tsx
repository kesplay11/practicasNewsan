  interface FilaEstaticaProps{
        onImClick? : () => void;
    }

export default function FilaEstatica({onImClick} : FilaEstaticaProps){

  
    return(
        <div className="flex flex-row items-center justify-around p-4 bg-black text-white text-3xl">
            <h2>MODELO</h2>
            <h2
                className="cursor-pointer underline hover:text-blue-300"
                onClick={onImClick}
            >
            INSERCIÓN MANUAL
            </h2>
            <h2>PRODUCCIÓN</h2>
            <h2>CLI</h2>
        </div>
    )
}
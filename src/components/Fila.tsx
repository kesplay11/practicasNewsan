interface MiComponenteHijosProps{
    dato1: string;
    dato2: number;
    dato3: number;
    dato4: number;
    id: number
}

export default function Fila(props : MiComponenteHijosProps){
    return(
        <div className="flex flex-row items-center justify-around bg-green-400 p-4 mx-0 my-[10px] w-full text-xl">
            <p>{props.dato1}</p>
            <p>{props.dato2}</p>
            <p>{props.dato3}</p>
            <p>{props.dato4}</p>
        </div>
    )
}
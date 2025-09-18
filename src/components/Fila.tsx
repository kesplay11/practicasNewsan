interface MiComponenteHijosProps{
    dato1: string;
    dato2: string;
    dato3: string;
    dato4: string;
    id: number
}

export default function Fila(props : MiComponenteHijosProps){
    return(
        <div className="fila">
            <p>{props.dato1}</p>
            <p>{props.dato2}</p>
            <p>{props.dato3}</p>
            <p>{props.dato4}</p>
        </div>
    )
}
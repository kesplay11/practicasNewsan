import type { IAndonPlacas } from "../../models/IAndonPlacas";

// Definimos los props extendidos para incluir la función de actualización
interface FilaProps extends IAndonPlacas {
    
}

export default function AndonPlacasFila(props: FilaProps) {

    return (
        <div 
            className="grid grid-cols-[1fr_1fr_1fr_1fr] items-center p-4 w-full text-5xl bg-[#86d4c9] p-4 mx-0 my-[10px] w-full text-3xl font-bold"
        >
            <p className=" text-center">{props.modelo_id}</p>
            <p className=" text-center">{props.IM ?? '0'}</p> {/* IM */}
            <p className=" text-center">{props.PROD}</p>{/* PROD */}
            <p className=" text-center">{props.CLI}</p>{/* CLI */}
        </div>
    );
}
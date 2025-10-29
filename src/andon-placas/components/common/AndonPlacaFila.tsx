import type { IAndonPlacas } from "../../models/IAndonPlacas";

// Definimos los props extendidos para incluir la función de actualización
interface FilaProps extends IAndonPlacas {
    onUpdate: (idProduccion: number) => void;
}

export default function Fila(props: FilaProps) {

    return (
        <div 
            className="flex flex-row items-center justify-around bg-green-400 p-4 mx-0 my-[10px] w-full text-xl cursor-pointer hover:bg-green-500 transition-colors"
            onClick={handleClick} // Ejecuta la acción al hacer clic
        >
            <p className="max-w-[20px]">{props.codigoModelo}</p>
            <p className="max-w-[20px]">{props.cantidadProducida ?? '0'}</p> {/* IM */}
            <p className="max-w-[20px]">{props.cantidad}</p>                {/* PROD */}
            <p className="max-w-[20px]">{props.cantidadRechazos}</p>        {/* CLI */}
        </div>
    );
}
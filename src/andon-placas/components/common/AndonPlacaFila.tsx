import type IAndonPlacas from "../../models/IAndonPlaca";

export default function Fila(props: IAndonPlacas) {
  return (
    <div className="flex flex-row items-center justify-around bg-green-400 p-4 mx-0 my-[10px] w-full text-xl">
      <p className="max-w-[20px]">{props.codigoModelo}</p>
      <p className="max-w-[20px]">{props.cantidadProducida ?? '0'}</p> {/* IM */}
      <p className="max-w-[20px]">{props.cantidad}</p>                {/* PROD */}
      <p className="max-w-[20px]">{props.cantidadRechazos}</p>        {/* CLI */}
    </div>
  )
}

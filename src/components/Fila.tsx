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




// 0
// : 
// {cantidadProducida: "0", turno: null, ultimaFechaEscaneado: "0001-01-01T00:00:00", fechaInicio: null,…}
// cantidad
// : 
// 1200
// cantidadProducida
// : 
// "0"
// cantidadRechazos
// : 
// 0
// capacidad
// : 
// "E22ILB"
// codigoModelo
// : 
// "S4UW24K231E"
// codigoModeloPar
// : 
// null
// deleted
// : 
// false
// desde
// : 
// 19676
// dobladora
// : 
// null
// estado
// : 
// null
// fecha
// : 
// "2025-09-09T00:00:00"
// fechaFinal
// : 
// null
// fechaInicio
// : 
// null
// fpy
// : 
// null
// hasta
// : 
// 20875
// idLinea
// : 
// 2
// idModelo
// : 
// 422
// idModeloNavigation
// : 
// null
// idPauta
// : 
// null
// idProduccion
// : 
// 2857
// idProveedor
// : 
// null
// infoEBS
// : 
// null
// inicio
// : 
// []
// insercion
// : 
// null
// linea
// : 
// {idLinea: 2, descripcion: "Unidad Exterior 2 PA", alias: "EXTERIOR LR", codigo: "UE",…}
// lote
// : 
// "115       "
// loteCerrado
// : 
// null
// mes
// : 
// null
// numeroOp
// : 
// "OP-291514"
// opsMainDisplay
// : 
// null
// organizacion
// : 
// "UP6"
// paradasPlacas
// : 
// 0
// pedidoCierreLote
// : 
// []
// pedidoMaterialesProduccion
// : 
// []
// pendiente
// : 
// 0
// planProdMateriales
// : 
// []
// producido
// : 
// null
// producidoPlacas
// : 
// null
// rechazados
// : 
// []
// rechazosDeLote
// : 
// 0
// rutaLogo
// : 
// null
// semielaborado
// : 
// null
// semielaboradoIA
// : 
// null
// semielaboradoIAFamiliaId
// : 
// 0
// semielaboradoIAId
// : 
// 0
// semielaboradoId
// : 
// null
// target
// : 
// null
// tipoSemiElaborado
// : 
// null
// tipoUnidad
// : 
// "E"
// turno
// : 
// null
// ultimaFechaEscaneado
// : 
// "0001-01-01T00:00:00"
// ultimoNewsan
// : 
// "6464"
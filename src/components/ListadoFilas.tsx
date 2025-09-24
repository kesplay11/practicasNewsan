import Fila from './Fila';
import type { MiComponenteHijosProps } from './Fila'
import { useEffect, useState } from 'react';
import service from '../services/services';


export default function ListadoFilas(){
    const [datos, setDatos] = useState<MiComponenteHijosProps[]>([])

    useEffect(()=>{
        async function fetchData(){
        const data = await service.getAllByLineaIdSinFiltro(2);
        setDatos(data);
        }
        fetchData();
    },[])

    return(
        <div className="w-full bg-green-800">
            {datos.map((item)=>(
                <Fila 
                    key={item.idProduccion}
                    idProduccion={item.idProduccion}
                    codigoModelo={item.codigoModelo}
                    capacidad={item.capacidad}
                    cantidad={item.cantidad}
                    cantidadRechazos={item.cantidadRechazos}
                    cantidadProducida={item.cantidadProducida}
                />
            ))}
        </div>
    )
}
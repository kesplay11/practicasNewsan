import { useEffect } from "react";
import { AndonPlacasSliceRequest } from "../reducers/AndonPlacas.slice"; 
import { useAppDispatch, useAppSelector } from "../../store/store";

import  AndonPlacasFila  from "../components/common/AndonPlacasFila";
import type { IAndonPlacas } from "../models/IAndonPlacas"; 
import { unwrapResult } from "@reduxjs/toolkit";


const REFRESH_INTERVAL = 10000;


export default function AndonPlacasListadoFilas(){
   let datas = 
  [
  {
    "modelo_id": "PHS32HA4CN",
    "IM": 5000,
    "PROD": 0,
    "CLI": 0
  },
  {
    "modelo_id": "THS25HA4CN",
    "IM": 1000,
    "PROD": 3000,
    "CLI": 64
  },
  {
    "modelo_id": "S4NW12JA31A",
    "IM": 5000,
    "PROD": 0,
    "CLI": 0
  },
  {
    "modelo_id": "SAS50HA3AN",
    "IM": 4500,
    "PROD": 500,
    "CLI": 0
  },
  {
    "modelo_id": "PHW32CA3BN",
    "IM": 100,
    "PROD": 4868,
    "CLI": 32
  }
]
    // const dispatch = useAppDispatch();
    // const { dataAll, loading } = useAppSelector((state) => state.andonPlacas)

    // const getAll = async () => {
    //     try {
    //         const response = unwrapResult(await dispatch(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels()))
    //         if (response) {
    //             console.log(response)
    //         }
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(()=>{
    //     if (loading === true){
    //         console.log("Despachacho accion para traer estados, osea cargar placas");
    //         getAll()
    //     }
            
    // },[dispatch])

    // if(loading === true){
    //     return(
    //     <div>
    //         <p>Cargando placas...</p>
    //     </div>
    //     )
    // }

    // if(!loading){
    //     return(
    //     <div>
    //         <p>Error al cargar placas. Intente recargar</p>
    //     </div>)
    // }


    return(
        <div className="py-[3px] flex flex-col items-center w-full overflow-y-hidden">
                
                {datas.length > 0 ? (
                    // 4. Mapeo del Array
                    datas.map((placa: IAndonPlacas) => (
                        <AndonPlacasFila 
                            key={placa.modelo_id} 
                            {...placa} // Pasa todas las propiedades de IAndonPlacas 
                        />
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500">
                        No se encontraron placas de producción.
                    </div>
                )}
        </div>
    )
}


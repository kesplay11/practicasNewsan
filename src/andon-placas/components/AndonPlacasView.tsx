import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks'; // Asumo que tienes hooks tipados
import Fila from './Fila'; // Tu componente de fila
import { AndonPlacasSliceRequest } from 'app/features/AndonPlacas/AndonPlacas.slice'; // Importa las acciones
import type { IAndonPlacas } from "../../models/IAndonPlacas";

// Definición de hooks tipados (si no los tienes, debes crearlos en 'app/hooks.ts')
// import { useDispatch, useSelector } from 'react-redux';
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default function AndonPlacasView() {
    // 1. Lectura del Estado (Selector)
    // Lee el estado 'dataAll' y 'loading' del slice 'AndonPlacas'
    const { dataAll: placas, loading } = useAppSelector((state) => state.AndonPlacas);
    
    // 2. Despacho de Acciones (Dispatch)
    const dispatch = useAppDispatch();

    // Función para cargar la lista de placas
    const loadPlaques = useCallback(() => {
        // Despacha la acción asíncrona para obtener todas las placas
        dispatch(AndonPlacasSliceRequest.GetAllPlaquesForSectorsAndForModels());
    }, [dispatch]);

    // Función para manejar el PUT (actualización)
    const handleUpdatePlaque = useCallback((idProduccion: number) => {
        // Despacha la acción asíncrona para actualizar una placa específica
        dispatch(AndonPlacasSliceRequest.PutCLIContenedorItemsRecepcionBloq(idProduccion));
    }, [dispatch]);

    // Ejecuta la carga inicial de datos al montar el componente
    useEffect(() => {
        loadPlaques();
    }, [loadPlaques]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Estado de Placas Andon</h1>
            <button 
                onClick={loadPlaques} 
                className="bg-blue-500 text-white p-2 rounded mb-4"
                disabled={loading === 'pending'} // Deshabilita si está cargando
            >
                {loading === 'pending' ? 'Cargando...' : 'Recargar Datos'}
            </button>
            
            {loading === 'pending' && placas.length === 0 && <p>Cargando datos iniciales...</p>}
            
            <div className="flex flex-col items-center">
                {placas.length > 0 ? (
                    placas.map((placa: IAndonPlacas) => (
                        <Fila 
                            key={placa.idProduccion} 
                            {...placa} 
                            // Pasamos la función de actualización como prop a la fila
                            onUpdate={handleUpdatePlaque}
                        />
                    ))
                ) : (
                    loading !== 'pending' && <p>No se encontraron placas.</p>
                )}
            </div>
        </div>
    );
}
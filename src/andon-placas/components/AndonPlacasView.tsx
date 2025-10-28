import { useEffect, useState, useMemo, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks'; // Asume esta ruta
import { AndonPlacasSliceRequest } from 'app/features/AndonPlacas/AndonPlacas.slice'; // Asume esta ruta
import type { IAndonPlacas } from "../../models/IAndonPlacas"; // Asume esta ruta

// Componentes de la vista
import Fila from './common/Fila'; 
import FilaEstatica from './common/FilaEstatica';
import { ButtonGroup } from '@mui/material';
import BotonDinamico from './common/BotonDinamico';

interface AndonPlacasViewProps {
  showNotification: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

export default function AndonPlacasView({ showNotification }: AndonPlacasViewProps) {
    
    // 1. Lógica de Redux para Obtener Datos y Estado de Carga
    const dispatch = useAppDispatch();
    const { dataAll: datos, loading } = useAppSelector((state) => state.AndonPlacas); // Leer desde el slice

    // 2. Estado local para la limitación de filas (Mantenido)
    // Inicializamos dataLimit como un array vacío de IAndonPlacas.
    const [dataLimit, setDataLimit] = useState<IAndonPlacas[]>([]);
    
    // Función para despachar la carga de datos
    const loadPlaques = useCallback(() => {
        dispatch(AndonPlacasSliceRequest.GetAllPlaquesForSectorsAndForModels());
    }, [dispatch]);

    // 3. Efecto para la carga inicial y el límite de datos
    // Se ejecuta al montar y cuando 'datos' (de Redux) cambia
    useEffect(() => {
        // Carga de datos inicial
        if (loading === null) {
            loadPlaques();
        }

        // Actualizar el límite de datos cuando 'datos' de Redux se carga
        if (datos && datos.length > 0) {
            // Replicamos la lógica inicial de slice(0, 10)
            setDataLimit(datos.slice(0, 10)); 
        } else if (loading === 'fullfiled' && datos.length === 0) {
            // Limpiar el límite si no hay datos después de la carga
            setDataLimit([]);
        }
    }, [datos, loading, loadPlaques]); // Dependencias: datos de Redux y el estado de carga

    // 4. Lógica de Botones Dinámicos (usa los datos de Redux)
    const buttonValues = useMemo(() => {
        const total = datos.length; // Usamos datos.length (de Redux)
        const maxButtons = 10;
        const baseIncrement = 10;

        if(total <= 50){
            const smallValues = [10,25].filter(val => val < total) ;
            if(!smallValues.includes(total)) {
                smallValues.push(total);
            }
            return smallValues
        }

        let increment = Math.max(baseIncrement, Math.ceil(total / maxButtons));

        const generatedValues: number[] = [];
        let currentValue = increment;

        while (currentValue < total && generatedValues.length < maxButtons -1){
            const roundedValue = Math.ceil(currentValue /10 )*10;
            generatedValues.push(roundedValue);
            currentValue += increment;
        }

        generatedValues.unshift(10);
        
        if (!generatedValues.includes(total)) {
            generatedValues.push(total)
        }
        return generatedValues
    }, [datos.length]);

    // 5. Manejo de Clics de Botones
    const handleClick = (limit: number) => {
        // Usa la lista completa de Redux ('datos') para aplicar el slice.
        setDataLimit(datos.slice(0, limit));
    };
    
    // Función simulada para ModalConfirm (a futuro)
    const handleConfirm = (updatedItem: IAndonPlacas) => {
        // En un futuro, aquí podrías despachar un PUT o una acción síncrona
        // dispatch(setObjectAndonPlacas(updatedItem)); 
        showNotification('Transferencia simulada', 'success');
    };

    return (
        <div className="w-full bg-green-800 p-4 min-h-screen">
            <h1 className='text-3xl font-bold text-white text-center mb-4'>Andon Placas View (Redux)</h1>
            
            {/* Indicador de Carga */}
            {loading === 'pending' && <p className="text-white text-center py-4">Cargando placas...</p>}
            
            {/* Encabezado Estático (con botón IM - sin lógica aún) */}
            <FilaEstatica onImClick={() => console.log('Modal Abrir (Lógica a futuro)')} />

            {/* Listado de Filas Limitadas */}
            {loading !== 'pending' && dataLimit.length === 0 ? (
                <p className="text-white text-center py-8">No se encontraron datos de placas o la carga falló.</p>
            ) : (
                dataLimit.map((item) => (
                    <Fila 
                        key={item.idProduccion} 
                        {...item}
                    />
                ))
            )}
            
            {/* Botones de Límite */}
            {datos.length > 0 && (
                <div className='flex flex-col bg-green-800 items-center justify-center pt-8'>
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                    {buttonValues.map((value) => (
                        <BotonDinamico
                            key={value}
                            value={value}
                            onClick={() => handleClick(value)}
                        />
                    ))}
                    </ButtonGroup>
                </div>
            )}
            
            {/* Modal Transferencia (QUITADO por solicitud) */}

        </div>
    );
}

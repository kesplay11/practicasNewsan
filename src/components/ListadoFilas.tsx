// components/ListadoFilas.tsx

import { useEffect, useState, useMemo } from 'react';
import Fila from './common/Fila';
import type { MiComponenteHijosProps } from './common/Fila';
import FilaEstatica from './common/FilaEstatica';
import service from '../services/services';
import ModalTransferencia from './modal/ModalTransferencia';
import {  ButtonGroup } from '@mui/material';
import BotonDinamico from './common/BotonDinamico';

interface ListadoFilasProps {
  showNotification: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void;
}

export default function ListadoFilas({showNotification}:ListadoFilasProps) {
  const [datos, setDatos] = useState<MiComponenteHijosProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataLimit, setDataLimit] = useState<MiComponenteHijosProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await service.getAllByLineaIdSinFiltro(2);
         setDatos(data);
         setDataLimit(data.slice(0,10));
        console.log(datos.length);
        
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchData();
  }, []);

  const buttonValues = useMemo(() => {
    const total = datos.length;
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
  }, [datos.length])

  const handleClick = (limit: number) => {
     setDataLimit(datos.slice(0, limit))
   };

  const handleConfirm = (updatedItem: MiComponenteHijosProps) => {
    setDataLimit(prev =>
      prev.map(item =>
        item.idProduccion === updatedItem.idProduccion ? updatedItem : item
      )
    );
    showNotification('Transferencia realizada con éxito', 'success');
  };


  return (
    <div className="w-full bg-green-800 p-4">
      {/* ¡El encabezado tiene el botón IM! */}
      <FilaEstatica onImClick={() => setModalOpen(true)} />

      {dataLimit.map((item) => (
        <Fila 
        key={item.idProduccion} {...item}
          
        />
      ))}
      <div className='flex flex-col bg-green-800 items-center justify-center'>
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
    
      <ModalTransferencia
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        datos={dataLimit}
        onConfirm={handleConfirm}
        showNotification={showNotification}
      />

    </div>
  );
}

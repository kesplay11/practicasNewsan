// components/ListadoFilas.tsx

import { useEffect, useState, useMemo } from 'react';
import Fila from './Fila';
import type { MiComponenteHijosProps } from './Fila';
import FilaEstatica from './FilaEstatica';
import service from '../services/services';

import ModalTransferencia from './ModalTransferencia';
import {  ButtonGroup } from '@mui/material';

import BotonDinamico from './BotonDinamico';
import React from 'react';

export default function ListadoFilas() {
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
    const values = [10, 50 , 100, 200];
    const dynamicValues = values.filter(val => val < total)

    if(!dynamicValues.includes(total)){
      dynamicValues.push(total)
    }
    return dynamicValues
  }, [datos.length])

  const handleClick = (limit: number) => {
     setDataLimit(datos.slice(0, limit))
   };

  const handleConfirm = (updatedItem: MiComponenteHijosProps) => {
    setDatos(prev =>
      prev.map(item =>
        item.idProduccion === updatedItem.idProduccion ? updatedItem : item
      )
    );
  };

  return (
    <div className="w-full bg-green-800 p-4">
      {/* ¡El encabezado tiene el botón IM! */}
      <FilaEstatica onImClick={() => setModalOpen(true)} />

      {dataLimit.map((item) => (
        <Fila key={item.idProduccion} {...item} />
      ))}

      <ButtonGroup variant="contained" aria-label="Basic button group">
        {buttonValues.map((value) => (
          <BotonDinamico
            key={value}
            value={value}
            onClick={() => handleClick(value)}
          />
        ))}
      </ButtonGroup>


      <ModalTransferencia
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        datos={datos}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

// components/ListadoFilas.tsx

import { useEffect, useState } from 'react';
import Fila from './Fila';
import type { MiComponenteHijosProps } from './Fila';
import FilaEstatica from './FilaEstatica';
import service from '../services/services';
import ModalTransferencia from './ModalTransferencia';
import { Button, ButtonGroup } from '@mui/material';
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

   const handleClick = (event : React.MouseEvent<HTMLButtonElement>) => {
    // event.target es el elemento <button> del DOM
    console.log('Botón clickeado');
    // Si necesitas algún dato del botón, puedes asociarlo con una prop 'value'
    const valor = (event.target as HTMLButtonElement).dataset.value as string;
    const parseo = parseInt(valor);
    setDataLimit(datos.slice(0,parseo));
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
        <Button
        data-value="10"
        onClick={handleClick}
        >10</Button>
        <Button
          data-value="20"
          onClick={handleClick}
        >20</Button>
        <Button 
          data-value="70"
          onClick={handleClick}
        >70</Button>
        <Button
          data-value="80"
          onClick={handleClick}
        >80</Button>
        <Button
          data-value="100"
          onClick={handleClick}
        >100</Button>
        <Button
          data-value="120"
          onClick={handleClick}
        >120</Button>
        <Button
          data-value="140"
          onClick={handleClick}
        >140</Button>
        <Button
          data-value="280"
          onClick={handleClick}
        >280</Button>
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

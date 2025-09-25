// components/ListadoFilas.tsx

import { useEffect, useState } from 'react';
import Fila from './Fila';
import type { MiComponenteHijosProps } from './Fila';
import FilaEstatica from './FilaEstatica';
import service from '../services/services';
import ModalTransferencia from './ModalTransferencia';
import { Button } from '@mui/material';

export default function ListadoFilas() {
  const [datos, setDatos] = useState<MiComponenteHijosProps[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [dataLimit, setDataLimit] = useState<MiComponenteHijosProps[]>([]);


  

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await service.getAllByLineaIdSinFiltro(2);
        setDatos(data);
        setDataLimit(data.slice(0,7));
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    }
    fetchData();
  }, []);

  const loadMore = () => {
    let max = dataLimit.length;
    let maxLimit = datos.length;
    if (max < maxLimit){
      max += 7;
      setDataLimit(datos.slice(0,max));
    }

  }

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

       <Button variant="contained" onClick={loadMore}>Cargar más</Button> 

      <ModalTransferencia
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        datos={datos}
        onConfirm={handleConfirm}
      />
    </div>
  );
}

// components/ModalTransferencia.tsx

import { Modal, Box, Typography, Button } from '@mui/material';
import { useState } from 'react';
import type { MiComponenteHijosProps } from '../common/Fila';
import type { FormValues } from '../forms/FormularioTransferencia'
import FormularioTransferencia from '../forms/FormularioTransferencia';
import ModalConfirmacion from './ModalConfirmacion';
import ModalExito from './ModalExito';

interface ModalTransferenciaProps {
  open: boolean;
  onClose: () => void;
  datos: MiComponenteHijosProps[];
  onConfirm: (updatedItem: MiComponenteHijosProps) => void;
  showNotification: (message: string, severity?: 'success' | 'error' | 'warning' | 'info') => void; // ✅ Nueva prop
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 3,
  maxHeight: '90vh',
  overflow: 'auto'
};

export default function ModalTransferencia({
  open,
  onClose,
  datos,
  onConfirm,
  showNotification
}: ModalTransferenciaProps) {
  const [openModalConfirm, setOpenModalConfirm] = useState(false);
  const [openModalExito, setOpenModalExito] = useState(false);
  const [datosParaConfirmar, setDatosParaConfirmar] = useState<any>(null);
  const [mensajeExito, setMensajeExito] = useState('');

  const handleAbrirConfirmacion = ( formData: FormValues ) => {
    setDatosParaConfirmar(formData);
    setOpenModalConfirm(true);
  };

  const handleConfirmTransferencia = () => {
    if (!datosParaConfirmar) return;

    const selectedItem = datos.find(item => item.idProduccion === datosParaConfirmar.idProduccion);
    if (!selectedItem) return;

    const { cantidadRestar, destino } = datosParaConfirmar;
    const imValue = Number(selectedItem.cantidadProducida ?? '0');
    const nuevoIm = imValue - cantidadRestar;

    const updatedItem = { ...selectedItem };
    if (destino === 'PROD') {
      updatedItem.cantidad += cantidadRestar;
    } else {
      updatedItem.cantidadRechazos += cantidadRestar;
    }
    updatedItem.cantidadProducida = nuevoIm.toString();

    onConfirm(updatedItem);

    const destinoLabel = destino === 'PROD' ? 'PROD' : 'CLI';
    setMensajeExito(
      `Se transfirieron ${cantidadRestar} placas desde IM a ${destinoLabel}. Nuevo valor de IM: ${nuevoIm}`
    );
    
    showNotification(mensajeExito, 'success')
    setOpenModalConfirm(false);
    setOpenModalExito(true);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-transferencia">
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Transferencia de Placas</Typography>

        {/* ✅ El formulario ahora está separado */}
        <FormularioTransferencia
          datos={datos}
          onConfirm={() => {}} // Ya no usado (el submit lo maneja el form)
          onSubmitForm={handleAbrirConfirmacion}
        />

        <Button
          onClick={onClose}
          variant="outlined"
          color="secondary"
          sx={{ mt: 2 }}
        >
          Salir
        </Button>

        {/* Modales secundarios */}
        <ModalConfirmacion
          open={openModalConfirm}
          onClose={() => setOpenModalConfirm(false)}
          onConfirm={handleConfirmTransferencia}
          title="¿Estás seguro?"
          message="Esta acción no se puede deshacer."
        />

        <ModalExito
          open={openModalExito}
          onClose={() => setOpenModalExito(false)}
          onCerrarTodo={onClose}
          message={mensajeExito}
        />
      </Box>
    </Modal>
  );
}
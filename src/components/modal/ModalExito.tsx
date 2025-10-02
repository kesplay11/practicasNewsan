// components/ModalExito.tsx

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

interface ModalExitoProps {
  open: boolean;
  onClose: () => void;          // Cierra solo este modal
  onCerrarTodo: () => void;     // Cierra todos los modales
  message: string;              // Mensaje dinámico (con datos de la operación)
}

export default function ModalExito({
  open,
  onClose,
  onCerrarTodo,
  message
}: ModalExitoProps) {
  return (

    <Dialog
      open={open}
      onClose={onCerrarTodo}
      aria-labelledby="modal-exito-title"
    >
      

      <DialogTitle id="modal-exito-title">
        ¡Operación exitosa!
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="modal-exito-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={onCerrarTodo} 
          variant="outlined" 
          color="secondary"
        >
          Cerrar todo
        </Button>
        <Button 
          onClick={onClose} 
          variant="contained" 
          color="primary"
          autoFocus
        >
          Hacer otra operación
        </Button>
      </DialogActions>
    </Dialog>
  );
}
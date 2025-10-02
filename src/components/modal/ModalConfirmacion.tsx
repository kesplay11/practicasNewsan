
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface ModalConfirmProps{
  title: string;
  message: string;
  onClose: () => void; // Función para cerrar el modal
  onConfirm: () => void;
  open: boolean;
}

export default function AlertDialog({title, message, onClose, onConfirm, open} : ModalConfirmProps) {

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={()=>{ 
            onClose();
            onConfirm();
          }} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

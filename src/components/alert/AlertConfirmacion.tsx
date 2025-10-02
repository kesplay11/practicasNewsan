// components/AlertGlobal.tsx

import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import { useState, useEffect } from 'react';

interface AlertGlobalProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
  onClose: () => void;
}

export default function AlertGlobal({
  open,
  message,
  severity = 'success',
  autoHideDuration = 5000,
  onClose
}: AlertGlobalProps) {
  // Reiniciar el Snackbar cuando `open` cambia a true
  useEffect(() => {
    if (open) {
      // No necesitamos hacer nada aquí, Snackbar lo maneja
    }
  }, [open]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{ zIndex: 9999 }} // Asegura que esté por encima de todo
    >
      <Alert
        severity={severity}
        sx={{
          width: '100%',
          maxWidth: 400,
          boxShadow: 3,
          borderRadius: 1
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
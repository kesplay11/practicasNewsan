// App.tsx

import { useState, useEffect } from 'react';
import Cabecera from './components/Cabecera';
import ListadoFilas from './components/ListadoFilas';
import { Snackbar, Alert } from '@mui/material';
import type { AlertColor } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css";

// ✅ Importa tu interfaz para tipar correctamente
import type { MiComponenteHijosProps } from './components/common/Fila'; // Ajusta la ruta si es necesario

function App() {
  // ✅ Estado para las notificaciones (usando solo React nativo)
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: AlertColor;
  } | null>(null);

  // ✅ Función para mostrar notificaciones (se pasará a ListadoFilas)
  const showNotification = (
    message: string,
    severity: AlertColor = 'success'
  ) => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification(null);
  };

  return (
    <div className='flex flex-1 flex-col bg-green-800 min-h-0 h-screen w-full'>
      <Cabecera />
      <div className="flex flex-col bg-green-800 items-center justify-center">
        {/* ✅ Pasamos showNotification como prop */}
        <ListadoFilas showNotification={showNotification} />
      </div>

      {/* ✅ Snackbar + Alert integrado directamente en App.tsx */}
      <Snackbar
        open={notification?.open || false}
        autoHideDuration={5000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 9999 }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification?.severity || 'success'}
          sx={{
            width: '100%',
            maxWidth: 400,
            boxShadow: 3,
            borderRadius: 1
          }}
        >
          {notification?.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
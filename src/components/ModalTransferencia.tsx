// components/ModalTransferencia.tsx

import {
  Modal,
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FilaEstatica from './FilaEstatica';
import Fila from './Fila';
import type { MiComponenteHijosProps } from './Fila';

interface ModalTransferenciaProps {
  open: boolean;
  onClose: () => void;
  datos: MiComponenteHijosProps[];
  onConfirm: (updatedItem: MiComponenteHijosProps) => void;
}

interface FormValues {
  codigoModelo: number | '';
  cantidadRestar: number | null;
  destino: 'PROD' | 'CLI';
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
  onConfirm
}: ModalTransferenciaProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      codigoModelo: '',
      cantidadRestar: null,
      destino: 'PROD'
    }
  });

  const selectedCodigo = watch('codigoModelo');
  const selectedItem = datos.find(item => item.codigoModelo === selectedCodigo);

  const onSubmit = ( data : FormValues ) => {
    if (!selectedItem || data.cantidadRestar === null) return;

    const imValue = Number(selectedItem.cantidadProducida ?? '0');
    const cantidadRestar = data.cantidadRestar;

    // Validaciones
    if (cantidadRestar <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }
    if (cantidadRestar > imValue) {
      alert(`No puedes restar más de ${imValue} (disponible en IM)`);
      return;
    }

    // Clonar y actualizar
    const updatedItem = { ...selectedItem };
    const nuevoIm = imValue - cantidadRestar;

    if (data.destino === 'PROD') {
      updatedItem.cantidad += cantidadRestar; // PROD aumenta
    } else {
      updatedItem.cantidadRechazos += cantidadRestar; // CLI aumenta
    }

    updatedItem.cantidadProducida = nuevoIm.toString(); // IM como string

    onConfirm(updatedItem);
    // No cerramos el modal → permite hacer más operaciones
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-transferencia">
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Transferencia de Placas</Typography>

        {/* Select de códigos modelo */}
        <Controller
          name="codigoModelo"
          control={control}
          rules={{ required: 'Selecciona un código modelo' }}
          render={({ field }) => (
            <FormControl fullWidth margin="dense">
              <InputLabel id="codigo-modelo-label">Código Modelo</InputLabel>
              <Select
                {...field}
                labelId="codigo-modelo-label"
                label="Código Modelo"
                value={field.value}
                onChange={(e) => {
                  field.onChange(e);
                  setValue('cantidadRestar', null); // Reset al cambiar modelo
                }}
              >
                {datos.map((item) => (
                  <MenuItem key={item.codigoModelo} value={item.codigoModelo}>
                    {item.codigoModelo}
                  </MenuItem>
                ))}
              </Select>
              {errors.codigoModelo && (
                <FormHelperText error>{errors.codigoModelo.message}</FormHelperText>
              )}
            </FormControl>
          )}
        />

        {/* Mostrar fila seleccionada */}
        {selectedItem && (
          <>
            <FilaEstatica />
            <Fila {...selectedItem} />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <Controller
                name="cantidadRestar"
                control={control}
                rules={{
                  required: 'Requerido',
                  min: { value: 1, message: 'Mínimo 1' }
                }}
                render={({ field }) => {
                  const imValue = Number(selectedItem.cantidadProducida ?? '0');
                  return (
                    <TextField
                      {...field}
                      label={`Cantidad a restar de IM (disponible: ${imValue})`}
                      type="number"
                      fullWidth
                      margin="dense"
                      inputProps={{ min: 1, max: imValue }}
                      value={field.value ?? ''}
                      onChange={(e) => {
                        const val = e.target.value ? Number(e.target.value) : null;
                        if (val !== null && val > imValue) return; // Evitar exceso
                        field.onChange(val);
                      }}
                      error={!!errors.cantidadRestar}
                      helperText={errors.cantidadRestar?.message || `Máximo: ${imValue}`}
                    />
                  );
                }}
              />

              <Controller
                name="destino"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    row
                    {...field}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value as 'PROD' | 'CLI')}
                    className="mt-2"
                  >
                    <FormControlLabel
                      value="PROD"
                      control={<Radio />}
                      label="Transferir a PROD"
                    />
                    <FormControlLabel
                      value="CLI"
                      control={<Radio />}
                      label="Transferir a CLI"
                    />
                  </RadioGroup>
                )}
              />

              <Box mt={2} display="flex" gap={2}>
                <Button type="submit" variant="contained" color="primary">
                  Confirmar Transferencia
                </Button>
                <Button onClick={onClose} variant="outlined" color="secondary">
                  Salir
                </Button>
              </Box>
            </form>
          </>
        )}
      </Box>
    </Modal>
  );
}
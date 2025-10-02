// components/FormularioTransferencia.tsx

import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, FormControlLabel } from '@mui/material';
import { useForm, Controller} from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import FilaEstatica from '../common/FilaEstatica';
import Fila from '../common/Fila';
import type { MiComponenteHijosProps } from '../common/Fila';

export interface FormValues {
  idProduccion: number | '';
  cantidadRestar: number | null;
  destino: 'PROD' | 'CLI';
}

interface FormularioTransferenciaProps {
  datos: MiComponenteHijosProps[];
  onConfirm: () => void; // Solo notifica que se quiere confirmar (validación la hace el formulario)
  onSubmitForm: ( data : FormValues) => void; // Para guardar los datos válidos
}

export default function FormularioTransferencia({
  datos,
  onConfirm,
  onSubmitForm
}: FormularioTransferenciaProps) {
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: {
      idProduccion: '',
      cantidadRestar: null,
      destino: 'PROD'
    }
  });

  const selectedCodigo = watch('idProduccion');
  const selectedItem = datos.find(item => item.idProduccion === selectedCodigo);

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSubmitForm(data); // Pasamos los datos al padre para guardarlos
    onConfirm();        // Y notificamos que se puede abrir el modal de confirmación
  };

  return (
    <>
      <Controller
        name="idProduccion"
        control={control}
        rules={{ required: 'Selecciona un código modelo' }}
        render={({ field }) => (
          <FormControl fullWidth margin="dense">
            <InputLabel id="idProduccion-label">Código Modelo</InputLabel>
            <Select
              {...field}
              labelId="idProduccion-label"
              label="Código Modelo"
              value={field.value}
              onChange={(e) => {
                field.onChange(e);
                setValue('cantidadRestar', null);
              }}
            >
              {datos.map((item) => (
                <MenuItem key={item.idProduccion} value={item.idProduccion}>
                  {item.codigoModelo}
                </MenuItem>
              ))}
            </Select>
            {errors.idProduccion && (
              <FormHelperText error>{errors.idProduccion.message}</FormHelperText>
            )}
          </FormControl>
        )}
      />

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
                      if (val !== null && val > imValue) return;
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
              <Button
                variant="contained"
                color="primary"
                type="submit" // ← Ahora usamos type="submit"
              >
                Confirmar Transferencia
              </Button>
            </Box>
          </form>
        </>
      )}
    </>
  );
}
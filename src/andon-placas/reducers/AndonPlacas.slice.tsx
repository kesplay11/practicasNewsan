import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IAndonPlacas } from "../models/IAndonPlacas";
import { AndonPlacasServices } from "../services/AndonPlacas.services";
interface IInitState<T> {
    loading: boolean
    dataAll: T[]
    data: null
    object: null
}

const andonPlacasService = new AndonPlacasServices();

class AndonPlacasClass {
    private service: AndonPlacasServices;
    constructor( service: AndonPlacasServices) {
        this.service = service;
    }

    // El Thunk ahora implementa su propia lógica de manejo de errores
    getAllPlaquesForSectorsAndForModels = createAsyncThunk<
        IAndonPlacas[], 
        void, 
        { rejectValue: string } // Tipo del payload de error
    >(
        `CLIContenedorItemsRecepcionBloq/GetAllPlaquesForSectorsAndForModels`, 
        // El argumento 'info' es el thunkAPI
        async (_, info) => {
            try {
                // Llama al servicio directamente.
                return await this.service.getAllPlaquesForSectorsAndForModels();
            } catch (e: any) {
                // En un entorno real, aquí se despacharía la acción de notificación.
                const mensaje = e.response?.data?.message || "Error al obtener las placas.";
                
                // Usa rejectWithValue para enviar el mensaje al reducer 'rejected'.
                return info.rejectWithValue(mensaje);
            }
        }
    )
}

export const AndonPlacasSliceRequest = new AndonPlacasClass(andonPlacasService);

const initialState: IInitState<IAndonPlacas> = {
    loading: true || false,
    dataAll: [],
    data: null,
    object: null
};

export const AndonPlacasSlice = createSlice({
    name: "AndonPlacas",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels.pending, (state) => {
            state.loading = true; // Empieza la carga
        });
        builder.addCase(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels.fulfilled, (state, action) => {
            state.loading = false; // ¡Fin de la carga exitoso!
            state.dataAll = action.payload;
        });
        builder.addCase(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels.rejected, (state, _action) => {
            state.loading = false; // Fin de la carga con error
        });
    },
})
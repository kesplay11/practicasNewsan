/* eslint-disable unused-imports/no-unused-vars */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// Asumiendo que GenericSlice está disponible en esta ruta
import { GenericSlice } from "app/Middleware/reducers/genericSlice";
// Asumiendo que IIniState está disponible en esta ruta
import { IIniState } from "app/models"; 

import { andonPlacasService } from "app/services/andonPlacas.service"; // Importación del servicio mejorado
import type { IAndonPlacas } from "../models/IAndonPlacas";
// Asumiendo que errorNotification está disponible en esta ruta
import { errorNotification } from "../HelperMidleware/errorNotifications"; 

// 1. Tipos e Interfaz del Estado Específico
// El estado contendrá una lista (dataAll) para el POST y un objeto (object) para el PUT.
export interface AndonPlacasState extends IIniState<IAndonPlacas> {
    // Puedes añadir estados específicos si fueran necesarios, por ejemplo:
    // lastUpdatedPlaqueId: number | null; 
}

// 2. Definición del Servicio
const service = andonPlacasService; 

// 3. Clase del Slice (Hereda de GenericSlice para acciones base)
class AndonPlacasClassSlice extends GenericSlice<IAndonPlacas> {
    constructor(private andonPlacasService: typeof service) {
        super('AndonPlacas', andonPlacasService);
    }

    // ACCIÓN 1: Obtener todas las placas (POST/GET Lógico)
    // Usamos el tipo IAndonPlacas[] para el retorno
    GetAllPlaquesForSectorsAndForModels = createAsyncThunk<IAndonPlacas[], void>(
        `AndonPlacas/GetAllPlaquesForSectorsAndForModels`, 
        async (_, info) => {
            // Se envuelve la llamada al servicio en errorNotification
            return await errorNotification(() => this.andonPlacasService.getAllPlaquesForSectorsAndForModels(), info);
        }
    );

    // ACCIÓN 2: Actualizar una placa (PUT)
    // Espera un idProduccion y devuelve el objeto IAndonPlacas actualizado.
    PutCLIContenedorItemsRecepcionBloq = createAsyncThunk<IAndonPlacas, number>(
        `AndonPlacas/PutCLIContenedorItemsRecepcionBloq`, 
        async (idProduccion, info) => {
            return await errorNotification(() => this.andonPlacasService.putCLIContenedorItemsRecepcionBloq(idProduccion), info);
        }
    );

    // Opcional: Si quieres un reducer síncrono para limpiar el estado
    // SetObject = (payload: IAndonPlacas | null) => payload
}

// 4. Instancia de la Clase del Slice para exportar las acciones
export const AndonPlacasSliceRequest = new AndonPlacasClassSlice(service);

// 5. Estado Inicial Específico
const inititalState: AndonPlacasState = {
    loading: null,
    data: null,      // Para el resultado de un PUT/GET individual
    dataAll: [],     // Para el resultado del GET All
    object: null,    // Objeto genérico o temporal
    // Aquí puedes añadir propiedades específicas si las necesitas
};

// 6. Creación del Slice
export const AndonPlacasSlice = createSlice({
    name: 'AndonPlacas',
    initialState: inititalState,
    reducers: {
        // Reducer Síncrono opcional
        setObjectAndonPlacas: (state, action: PayloadAction<IAndonPlacas | null>) => {
            state.object = action.payload;
        },
    },
    extraReducers: (builder) => {
        // Agrega los reducers genéricos (CRUD básicos) de la clase base
        AndonPlacasSliceRequest.builderAll(builder); 

        // ----------------------------------------------------
        // Reducers para GetAllPlaquesForSectorsAndForModels (GET/POST)
        // ----------------------------------------------------
        builder.addCase(AndonPlacasSliceRequest.GetAllPlaquesForSectorsAndForModels.fulfilled, (state, action) => {
            state.dataAll = action.payload; // Guarda la lista de placas en dataAll
            state.loading = "fullfiled";
        });
        builder.addCase(AndonPlacasSliceRequest.GetAllPlaquesForSectorsAndForModels.rejected, (state, action) => {
            state.loading = "rejected";
            state.dataAll = []; // Opcional: Limpiar la lista si falla
        });
        builder.addCase(AndonPlacasSliceRequest.GetAllPlaquesForSectorsAndForModels.pending, (state, action) => {
            state.loading = "pending";
        });

        // ----------------------------------------------------
        // Reducers para PutCLIContenedorItemsRecepcionBloq (PUT)
        // ----------------------------------------------------
        builder.addCase(AndonPlacasSliceRequest.PutCLIContenedorItemsRecepcionBloq.fulfilled, (state, action) => {
            state.data = action.payload; // Guarda la placa actualizada en 'data' o 'object'
            state.object = action.payload; // También en object, si es más práctico para tu vista
            state.loading = "fullfiled";
            // Opcional: Lógica para actualizar el elemento dentro de state.dataAll (la lista)
            // const index = state.dataAll.findIndex(p => p.idProduccion === action.payload.idProduccion);
            // if (index !== -1) { state.dataAll[index] = action.payload; }
        });
        builder.addCase(AndonPlacasSliceRequest.PutCLIContenedorItemsRecepcionBloq.rejected, (state, action) => {
            state.loading = "rejected";
        });
        builder.addCase(AndonPlacasSliceRequest.PutCLIContenedorItemsRecepcionBloq.pending, (state, action) => {
            state.loading = "pending";
        });
    }
});

// Exporta las acciones síncronas para su uso en los componentes
export const { setObjectAndonPlacas } = AndonPlacasSlice.actions;

// Exporta el reducer para añadirlo al store de Redux
export default AndonPlacasSlice.reducer;
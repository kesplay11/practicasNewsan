import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { IAndonPlacas } from "../models/IAndonPlacas";
import { AndonPlacasServices } from "../services/AndonPlacas.services";
import { errorNotification } from "";
import { IInitState } from "";

const andonPlacasService = new AndonPlacasServices();

class AndonPlacasClass {
    private service: AndonPlacasServices;
    constructor( service: AndonPlacasServices) {
        this.service = service;
    }

    getAllPlaquesForSectorsAndForModels = createAsyncThunk<IAndonPlacas[]>(
        `AndonPlacas/GetAllPlaquesForSectorsAndForModels`, 
        async (_, info) => {
            return await errorNotification(
                () => this.service.getAllPlaquesForSectorsAndForModels(), 
                info
            );
        }
    )
}

export const AndonPlacasSliceRequest = new AndonPlacasClass(andonPlacasService);

const initialState: IInitState<IAndonPlacas> = {
    loading: null,
    dataAll: [],
    data: null,
    object: null
};

export const AndonPlacasSlice = createSlice({
    name: "AndonPlacas",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels.fulfilled, (state, action) => {
            state.loading = "fulfilled";
            state.dataAll = action.payload;
        });
        builder.addCase(AndonPlacasSliceRequest.getAllPlaquesForSectorsAndForModels.rejected, (state, action) => {
        state.loading = "rejected";
        });
    },
})
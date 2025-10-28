import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import type { IAndonPlacas  } from "../models/IAndonPlacas";
import { andonPlacasService, AndonPlacasServices } from "../services/AndonPlacas.services";

const  errorNotification = (message : string) => console.error('Algo paso mal en el slice: ',  message);

export interface AndonPlacasState  {
    dataAll: IAndonPlacas[];
    loading:  "idle" | "pending" | "succeded" | "failed" | null;
    error: string | null
}

 const initialState: AndonPlacasState = {
    dataAll: [],
    loading: null,
    error: null
 }

 export const GetAllPlaquesForSectorsAndForModels = createAsyncThunk(
    'andonPlacas/getAll',
    async ({_rejectWithValue}) => {
        try {
            const response = andonPlacasService.getAllPlaquesForSectorsAndForModels();
        }
    }
 )
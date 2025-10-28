import  {createSlice}  from "@reduxjs/toolkit";
import type {PayloadAction}  from "@reduxjs/toolkit";


interface ContadorState {
    valor: number
}

const initialState: ContadorState = {
    valor: 0
}

export const contadorSlice = createSlice({
    name : "contador",
    initialState,
    reducers:{
        incrementar: (state) => {
            valor += 1;
        },
        decrementar: (state) => {
            valor -= 1;
        },
        sumarCantidad: (state,action: PayloadAction<number>) => {
            state.valor += action.payload
        }
        
    }
})

export const { incrementar, decrementar, sumarCantidad } = contadorSlice.actions;

export default contadorSlice.reducer;

//para añadir el reducer iriamos al rootReducer, lo importariamos, y lo pegariamos
// export const rootReducer = combineReducers({
//     // ✅ Añadimos el nuevo slice
//     contador: contadorReducer, 
//     // ... otros slices ...
// });
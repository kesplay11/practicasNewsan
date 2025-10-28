import { useAppDispatch, useAppSelector } from "../store";
import { incrementar, decrementar, sumarCantidad } from "../reducers/test";

export default function Contador(){
    const contadorGlobal = useAppSelector((state) => state.contador.valor)

    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center justify-center p-8 border border-gray-300 rounded-lg shadow-lg">
            
            <h2 className="text-3xl font-bold mb-4">Valor del Contador: {contadorValor}</h2>
            
            {/* Botón 1: Despacha una acción sin payload */}
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded mb-2 hover:bg-blue-600"
                onClick={() => dispatch(incrementar())}
            >
                Incrementar (+1)
            </button>

            {/* Botón 2: Despacha una acción sin payload */}
            <button
                className="bg-red-500 text-white py-2 px-4 rounded mb-4 hover:bg-red-600"
                onClick={() => dispatch(decrementar())}
            >
                Decrementar (-1)
            </button>

            {/* Botón 3: Despacha una acción CON payload (argumento) */}
            <button
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={() => dispatch(sumarCantidad(5))} // Pasamos '5' como payload
            >
                Sumar Cantidad (+5)
            </button>

            <p className="mt-4 text-sm text-gray-600">
                Observa cómo el valor se actualiza globalmente.
            </p>
        </div>
    );

}
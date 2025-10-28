// Fila que actúa como encabezado
interface FilaEstaticaProps {
    onImClick: () => void;
}
export default function FilaEstatica({ onImClick }: FilaEstaticaProps) {
    return (
        <div className="flex flex-row items-center justify-around bg-green-900 p-4 w-full text-xl font-bold text-white rounded-t-lg shadow-xl">
            <p className="max-w-[200px]">MODELO</p>
            <p className="max-w-[150px] text-center">IM (Producido)</p>
            <p className="max-w-[150px] text-center">PROD (Objetivo)</p>
            <button 
                className="max-w-[150px] text-center cursor-pointer bg-red-600 hover:bg-red-700 p-1 rounded transition-colors"
                onClick={onImClick}
            >
                CLI (Rechazos)
            </button>
        </div>
    );
}

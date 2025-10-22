export default interface IAndonPlacas{
    idProduccion: number;
    codigoModelo: number;
    capacidad: number;          // ← no se muestra
    cantidad: number;           // ← PROD
    cantidadRechazos: number;   // ← CLI
    cantidadProducida?: string; // ← IM (viene como string)
}
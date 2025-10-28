import axios from "axios";
// Asumo que GenericService existe en tu proyecto, como en el ejemplo que me diste.
import { GenericService } from "app/services/generic.service"; 
import type { IAndonPlacas } from "../models/IAndonPlacas";
// Usar el patrón de URL base de tu código de referencia
const API_BASE_URL = process.env.REACT_APP_API_URL;

// Heredamos de GenericService aunque solo implementemos métodos específicos,
// manteniendo la coherencia estructural.
export class AndonPlacasServices extends GenericService<IAndonPlacas> {
    // URL relativa que se concatena con API_BASE_URL.
    Url = "CLIContenedorItemsRecepcionBloq"; 

    constructor() {
        super("CLIContenedorItemsRecepcionBloq"); // Nombre base para la URL
    }

    // 1. OBTENER TODAS LAS PLACAS (GET/POST Lógico)
    public async getAllPlaquesForSectorsAndForModels(): Promise<IAndonPlacas[]> {
        // Usamos async/await directamente sin envolver en new Promise, es más moderno y limpio.
        try {
            const url = `${API_BASE_URL}/${this.Url}/GetAllPlaquesForSectorsAndForModels`;
            const response = await axios.get<IAndonPlacas[]>(url);
            return response.data;
        } catch (error) {
            // Lanzamos el error para que Redux Toolkit y errorNotification lo gestionen.
            throw error;
        }
    }

    // 2. ACTUALIZAR UNA PLACA (PUT)
    public async putCLIContenedorItemsRecepcionBloq(idProduccion: number): Promise<IAndonPlacas> {
        try {
            //Preguntar a Stephano si la direccion del endpoint esta bien, o hay que elminarla
            const url = `${API_BASE_URL}/${this.Url}/CLIContenedorItemsRecepcionBloq/${idProduccion}`;
            // PUT sin cuerpo (body) es común para acciones de "cambiar estado" o "confirmar".
            const response = await axios.put<IAndonPlacas>(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const andonPlacasService = new AndonPlacasServices();
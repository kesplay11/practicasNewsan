import { AxiosError } from "axios";
import axios from 'axios';

class Service{
    private baseUrl:string;

    constructor() {
        this.baseUrl="https://spp.newsan.com.ar/api/CLIContenedorItemsRecepcionBloq"
    }
    //https://spp.newsan.com.ar/api/PlanProd
    ///GetAllByLineaIdSinFiltro/${lineaID}

    public async getAllPlaquesForSectorsAndForModels() : Promise<any[]>{
        try{
            const url = `${this.baseUrl}/GetAllPlaquesForSectorsAndForModels`;
            const response = await axios.get<any[]>(url);

            return response.data
        } catch (error){
            if (error instanceof AxiosError) {
            console.error("Error de Axios:", error.message);
                if (error.response) {
                console.error("Respuesta del servidor:", error.response.status, error.response.data);
                }
            } else {
                console.error("Error desconocido:", error);
            }
            throw error; // Deja que el componente decida cómo manejarlo
        }
    }

    public async putCLIContenedorItemsRecepcionBloq(idProduccion:number) : Promise<any>{
        try{
            const url = `${this.baseUrl}/putCLIContenedorItemsRecepcionBloq/${idProduccion}`;
            const response = await axios.get<any[]>(url);

            return response.data
        }
        catch (error){
            if (error instanceof AxiosError) {
            console.error("Error de Axios:", error.message);
                if (error.response) {
                console.error("Respuesta del servidor:", error.response.status, error.response.data);
                }
            } else {
                console.error("Error desconocido:", error);
            }
            throw error; // Deja que el componente decida cómo manejarlo
        }
    }
}

const service = new Service();
export default service;
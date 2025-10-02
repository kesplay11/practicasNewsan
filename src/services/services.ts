import { AxiosError } from "axios";
import axios from 'axios';

class Service{
    private baseUrl:string;

    constructor() {
        this.baseUrl="http://localhost:3000"
    }
    //https://spp.newsan.com.ar/api/PlanProd
    ///GetAllByLineaIdSinFiltro/${lineaID}

    public async getAllByLineaIdSinFiltro(lineaID:number) : Promise<any[]>{
        try{
            const url = `${this.baseUrl}`;
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
}

const service = new Service();
export default service;
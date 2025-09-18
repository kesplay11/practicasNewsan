import  { useState, useEffect } from 'react';
import moment from 'moment';

export default function Hora() {
  const [horaActual, setHoraActual] = useState<string>(moment().format('HH:mm:ss'));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHoraActual(moment().format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const getAllDate = async () => {
      try {
      const response = await fetch("https://spp.newsan.com.ar/api/PlanProd/GetAllByLineaIdSinFiltro/2")
      const data = response.json()
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    }
    getAllDate()
  }, [])

  return (
    <div>
      <h2 className="text-5xl bg-black ">
        {horaActual}
      </h2>
    </div>
  );
}
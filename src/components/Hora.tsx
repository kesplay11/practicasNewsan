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

  return (
    <div>
      <h2 className="text-5xl bg-black ">
        {horaActual}
      </h2>
    </div>
  );
}
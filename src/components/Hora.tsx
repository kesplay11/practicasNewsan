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
      <h2 className="hora-h2">
        {horaActual}
      </h2>
    </div>
  );
}
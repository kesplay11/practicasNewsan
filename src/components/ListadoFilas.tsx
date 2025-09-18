import Fila from './Fila';

export default function ListadoFilas(){
    const datos = [
        {id:1,dato1:"h1" ,dato2:"h2",dato3:"h3",dato4:"h4"},
        {id:2,dato1:"h324" ,dato2:"h2",dato3:"h14",dato4:"h4"},
        {id:3,dato1:"hfd" ,dato2:"h4",dato3:"h3",dato4:"h4"},
        {id:4,dato1:"h2" ,dato2:"h2",dato3:"h3",dato4:"h4"},


    ]

    return(
        <div className="contenedor-filas">
            {datos.map((item)=>(
                <Fila 
                    key={item.id}
                    id={item.id}
                    dato1={item.dato1}
                    dato2={item.dato2}
                    dato3={item.dato3}
                    dato4={item.dato4}
                />
            ))}
        </div>
    )
}
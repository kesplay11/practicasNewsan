import Fila from './Fila';

export default function ListadoFilas(){
    const datos = [
        {id:1, dato1:"PHIN35HABNE", dato2:2213,dato3:2212,dato4:12212},
        {id:2, dato1:"h324" ,dato2:2122,dato3:2122,dato4:121},
        {id:3, dato1:"hfd" ,dato2:1222,dato3:2221,dato4:1212},
        {id:4, dato1:"h2" ,dato2:22212,dato3:1222,dato4:2223},
    ]

    return(
        <div className="w-full">
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
import Cabecera from  './components/Cabecera';
import ListadoFilas from './components/ListadoFilas'
import FilaEstatica from './components/FilaEstatica'
import "./App.css"
function App() {

  return (
    <div className='app'>
      <Cabecera/>
      <div className="contenedor">
        <FilaEstatica/>
        <ListadoFilas/>
      </div>
      
    </div>
      
  )
}

export default App

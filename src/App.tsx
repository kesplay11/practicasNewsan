import Cabecera from  './components/Cabecera';
import ListadoFilas from './components/ListadoFilas'
import FilaEstatica from './components/FilaEstatica'
import "./App.css"
function App() {

  return (
    <div className='flex flex-1 flex-col bg-green-800 min-h-0 h-screen w-full'>
      <Cabecera/>
      <div className="flex flex-col">
        <FilaEstatica/>
        <ListadoFilas/>
      </div>
      
    </div>
      
  )
}

export default App

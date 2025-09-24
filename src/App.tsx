import Cabecera from  './components/Cabecera';
import ListadoFilas from './components/ListadoFilas'
import FilaEstatica from './components/FilaEstatica'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./App.css"
function App() {

  return (
    <div className='flex flex-1 flex-col bg-green-800 min-h-0 h-screen w-full'>

      <Cabecera/>
      <div className="flex flex-col bg-green-800">
        <FilaEstatica/>
        <ListadoFilas/>
      </div>
      
    </div>
      
  )
}

//Argument of type 'any[]' is not assignable to parameter of type 'SetStateAction<never[]>'. Type 'any[]' is not assignable to type 'never[]'. Type 'any' is not assignable to type 'never'.ts(2345) que significa este error?

export default App

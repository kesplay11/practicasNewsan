import Hora from './Hora';

export default function Cabecera(){
    return(
    <div className='flex flex-row items-center justify-between py-[1rem] px-[7rem] width-full text-white text-5xl'>
        <h1 className='bg-black text-white text-5xl'>STOCK PLACAS</h1>
        <Hora></Hora>
    </div>
    )
}
import { Button } from '@mui/material';

interface ButtonProps {
    id:number,
    value: string,
}

export default function Boton(props: ButtonProps){
    return(
        <Button>{props.value}</Button>
    )
}
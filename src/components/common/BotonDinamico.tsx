import { Button } from '@mui/material';

interface ButtonProps {
    value: number,
    onClick: () => void,
}

export default function BotonDinamico(props: ButtonProps){
    return(
        <Button
            onClick={props.onClick}>
            {props.value}
        </Button>
    )
}
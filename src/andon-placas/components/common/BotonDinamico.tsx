import { Button } from '@mui/material';

interface BotonDinamicoProps {
    value: number;
    onClick: (value: number) => void;
}

export default function BotonDinamico({ value, onClick }: BotonDinamicoProps) {
    return (
        <Button 
            onClick={() => onClick(value)} 
            variant="contained" 
            color="primary"
            sx={{ margin: 0.5, borderRadius: '8px', minWidth: '40px' }}
        >
            {value}
        </Button>
    );
}

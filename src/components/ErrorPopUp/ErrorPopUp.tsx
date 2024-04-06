import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ErrorPopupProps {
    open: boolean;
    setErrorMessage: (message: string) => void;
    errorMessage: string;
}

const ErrorPopup: React.FC<ErrorPopupProps> = ({ open, setErrorMessage, errorMessage }) => {

    const handleClose = () => {
        setErrorMessage('');
    };
    
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <p>{errorMessage}</p>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ErrorPopup;

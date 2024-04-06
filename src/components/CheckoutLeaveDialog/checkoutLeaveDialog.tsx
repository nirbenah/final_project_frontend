import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, Button } from '@mui/material';

interface CheckoutLeaveDialogProp {
    handleCloseDialog: () => void;
    handleLeavePage: () => void;
    openDialog: boolean;
}

const CheckoutLeaveDialog: React.FC<CheckoutLeaveDialogProp> = ({ handleCloseDialog, handleLeavePage, openDialog }) => {
    return (
        <div>
            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Checkout was unsuccessful. Are you sure you want to leave?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Stay
                    </Button>
                    <Button onClick={handleLeavePage} color="primary" autoFocus>
                        Leave
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CheckoutLeaveDialog;

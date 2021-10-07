import React from 'react';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const MessageDialog = (props) => {
  const { msg, open, onClose } = props;

  return (
    <Dialog open={open} onClick={() => onClose()}>
      <DialogTitle>
        Atenção!
      </DialogTitle>
      <DialogContent>
        {msg}
      </DialogContent>
      <DialogActions onClick={() => {}}>
        <Button onClick={() => onClose()}>Fechar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MessageDialog;

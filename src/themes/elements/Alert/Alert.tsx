import { Snackbar } from '@material-ui/core';
import React, { useMemo, useState } from 'react';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { IAlertStatus } from 'shared/interfaces/utils/IAlert';

export const Alert = (props: AlertProps) => <MuiAlert {...props} />;

type Props = {
  openProps?: boolean;
  autoHideDuration?: number;
  vertical?: 'top' | 'bottom';
  horizontal?: 'left' | 'center' | 'right';
};
export const useAlert = ({ openProps, autoHideDuration = 6000, vertical = 'bottom', horizontal = 'center' }: Props) => {
  const [open, setOpen] = useState<boolean>(openProps || false);
  const [status, setStatus] = useState<IAlertStatus>('success');
  const [message, setMessage] = useState<string | undefined>(undefined);

  const handleOpen = (status: IAlertStatus, message: string) => {
    setStatus(status);
    setMessage(message);
    setOpen(true);
  };
  const handleClose = () => {
    setStatus('success');
    setMessage(undefined);
    setOpen(false);
  };
  return useMemo(
    () => ({
      AlertOpen: (status: IAlertStatus, message: string) => handleOpen(status, message),
      isOpen: open,
      alertRef: (
        <Snackbar
          open={open}
          autoHideDuration={autoHideDuration}
          onClose={handleClose}
          anchorOrigin={{ horizontal, vertical }}
          key={vertical + horizontal}
        >
          <Alert onClose={handleClose} severity={status}>
            {message}
          </Alert>
        </Snackbar>
      ),
    }),
    [open, autoHideDuration, status, message, horizontal, vertical],
  );
};

import{forwardRef,useState,useEffect} from 'react';
import{useSelector} from 'react-redux';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const UserAlert = () =>  {
  const [open, setOpen] = useState(true);
  const msg = useSelector((state) => state.stationModule.msg)
  useEffect(() => {
    setOpen(true);
  } ,[msg])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
         {msg}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
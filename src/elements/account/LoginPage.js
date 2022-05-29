import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { observer } from 'mobx-react-lite'
import { loginAPI } from '../../axios/accountAPI';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [open, setOpen] = React.useState(false);
    const [user, setUser] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const pusher = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUser("")
        setPwd("")
    };

    const handleLogin = () => {
        loginAPI({
            username: user,
            password: pwd
        }).then(() => {
            handleClose()
            pusher("/")
        })
    }

    return (
        <div>
            <Button variant="text" color="inherit" onClick={handleClickOpen}>
                Login
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 23 }}>
                    LOGIN
                </DialogTitle>
                <DialogContent style={{ padding: '15px 50px' }}>
                    <TextField
                        label="Username" value={user}
                        type="text"
                        onChange={(e) => {
                            setUser(e.target.value)
                        }}
                        style={{ width: '100%', marginBottom: 25 }}
                    />
                    <TextField
                        label="Password" value={pwd}
                        type="password"
                        onChange={(e) => {
                            setPwd(e.target.value)
                        }}
                        style={{ width: '100%', marginBottom: 25 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleLogin} variant={user === "" || pwd === "" ? "text" : "contained"} autoFocus disabled={user === "" || pwd === ""}>
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default observer(Login)
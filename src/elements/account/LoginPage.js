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

    const encrypt = (password) => {
        let letter = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "1", "2",
            "3", "4", "5", "6", "7", "8", "9", "0"]

        let pwdArray = password.split("").map(x => `${x}`)
        let pwdIndexArray = pwdArray.map((x) => {
            let li = letter.findIndex(l => l === x) + 5
            return li > letter.length - 1 ? li - letter.length - 1 : li
        })

        let result = pwdIndexArray.map(x => letter[x])
        return result.join("")
    }

    const handleLogin = () => {
        loginAPI({
            username: user,
            password: encrypt(pwd)
        }).then((x) => {
            if (x) {
                handleClose()
                pusher("/")
            } else {
                alert("Incorrect password/username")
                setPwd("")
            }
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
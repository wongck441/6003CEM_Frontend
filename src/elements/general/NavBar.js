import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';

// elements
import DrawerMenu from './DrawerMenu';
import Register from '../account/RegisterationPage';
import LoginPage from '../account/LoginPage';

import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { loginout } from '../../mobx/account';

export default observer(() => {
    const pusher = useNavigate()
    const [wait, setWait] = React.useState("")

    const handleLogout = () => {
        setWait(true)

        setTimeout(() => {
            loginout.setLogout()
            pusher("/")
            setWait(false)
        }, 1000)
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ background: '#1F1E1F' }}>
                <Toolbar>
                    <DrawerMenu />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        The Canine Shelter
                    </Typography>
                    {loginout.isLogedIn() ?
                        <>
                            {!!!wait &&
                                <Button size="small" variant="outlined" color="inherit" style={{ marginRight: 15, textTransform: "capitalize" }}>
                                    {loginout.currentUser()}
                                </Button>
                            }
                            <Button
                                variant="text"
                                color="inherit"
                                style={{ margin: '0 10px' }}
                                onClick={handleLogout}
                            >
                                {wait ? <CircularProgress size={25} color="inherit" /> : "Logout"}
                            </Button>
                        </>
                        :
                        <>
                            <LoginPage />
                            <Button
                                variant="contained"
                                style={{ background: '#f1f1f1',color:'#1e1f1e', margin: '0 10px' }}
                                onClick={() => pusher('/register')}
                            >
                                Register
                            </Button>
                        </>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
})
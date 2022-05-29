import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';

import { IconButton } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';

import { useNavigate } from 'react-router-dom';

const DrawerMenu = () => {
    const pusher = useNavigate()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem disablePadding style={{background: '#f1f1f1'}}>
                    <ListItemButton disabled>
                        <ListItemIcon>
                            <PetsOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="The Canine Shelter" />
                    </ListItemButton>
                </ListItem>
                <Divider style={{margin: '10px 0'}}/>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => pusher("/")}>
                        <ListItemIcon>
                            <HomeOutlinedIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer("left", true)}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor={"left"}
                open={state["left"]}
                onClose={toggleDrawer("left", false)}
            >
                {list("left")}
            </Drawer>
        </div>
    );
}


export default DrawerMenu
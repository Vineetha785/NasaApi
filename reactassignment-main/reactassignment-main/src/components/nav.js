
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Nav(){
    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
              <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Vineetha Bandla
              </Typography>
              <Button color="inherit" component={Link} to="/about">About</Button>
            <Button color="inherit" component={Link} to="/forms">Forms</Button>
            <Button color="inherit" component={Link} to="/links">source</Button>
          
              
            </Toolbar>
          </AppBar>
        </Box>
      );
}

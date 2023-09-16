import React, { useState, useEffect, Fragment } from 'react';
import { 
  AppBar, 
  Typography, 
  Toolbar, 
  Avatar, 
  Button, 
} from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoText from '../../images/memoText.png';
import memoLogo from '../../images/memoLogo.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';




const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  // const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  // const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);


  // const openMobileMenu = (e) => {
  //   setMobileMenuAnchorEl(e.currentTarget);
  // }

  // const closeMobileMenu = (e) => {
  //   setMobileMenuAnchorEl(null);
  // }

  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    
    history.push('/auth');
    
    setUser();
  }; 
  
  
  useEffect(()=>{
    const token = user?.token;
    
    if(token) {
      const decodedToken = decode(token);                                //decoded token to check it whether it is expired or not so that we can logout automatically
      if(decodedToken.exp * 1000 < new Date().getTime())        //decodedToken.exp * 1000 value in milli second
      logout();
    }
    
    // JWT.. (JASON WEB TOKEN--> manual login /sign up system)
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[location]);                                                       //when location changes i.e '/auth' to '/' automatic profile comes on the top without refresh 
  
  // const mobileMenu =  (
  //   <Menu anchorEl={mobileMenuAnchorEl} id="mobile-menu" keepMounted open={isMobileMenuOpen}>
  //     <MenuItem onClick={closeMobileMenu} className = {classes.purple} alt = {user?.result.name} src = {user?.result.imageUrl }>{user?.result.name.charAt(0)}</MenuItem>
  //     <MenuItem onClick={closeMobileMenu} className = {classes.userName} variant = "h6">{user.result.name}</MenuItem>
  //     <MenuItem onClick={closeMobileMenu} variant = "contained" className = {classes.logout} color="secondary" onClick ={logout} >Logout</MenuItem>
  //   </Menu>
  // );
  
    return (
    
      <AppBar className={classes.appBar} position="static" color="inherit">
        <div className={classes.brandContainer}>
         <Link to="/">
          <img className={classes.image} src={memoLogo} alt="icon" height="45px"  />
          <img className ={ classes.txtImg }src={memoText} alt="icon" height="50px" />
        </Link>
        </div>
        <Toolbar className={classes.toolbar}>
            {user?.result ? (
                <div className= {classes.profile}>
                  <Avatar className = {classes.purple} alt = {user?.result.name} src = {user?.result.imageUrl }>{user?.result.name.charAt(0)} </Avatar>
                  <Typography className = {classes.userName} variant = "h6">{user.result.name}</Typography>                
                  <Button variant = "contained" className = {classes.logout} color="secondary" onClick ={logout} >Logout</Button>
                </div>  
            ) : (
             <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
          )}
        </Toolbar>
    </AppBar>
    );
};

export default Navbar;

     


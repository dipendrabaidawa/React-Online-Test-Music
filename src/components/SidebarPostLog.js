import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { 
    makeStyles,
    SwipeableDrawer,
    List,
    Button,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import themes from '../theme';
import firebase from 'firebase';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  button: {
      '&:focus': { 
        outline: 'none', //removes border around object when clicking
      }
  },
  menuIcon: {
    color: 'white',
  },
  divider: {
    marginBottom: 60,
    color: 'white',
  },
  paper: {
    background: themes.palette.secondary.main,
  },
  listItem: {
    color: 'white',
  }
});



export default function SidebarPostLog() {
  const classes = useStyles();
  const [state, setState] = useState({right: false})

  const toggleDrawer = (anchor, open) => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    )
    {
      return
    }
    setState({ [anchor]: open });
  }


  const signout = () => {
    firebase.auth().signOut().then(() => {
        alert("You have been signed out");
        }).catch((error) => {
        console.log("Error caught");
     });
    }
  return (
    <div>
      <React.Fragment>
        {/* Condition renders button if sidebar is open or closed for toggling */}
        {!state.right ? 
          <Button  
            onClick={toggleDrawer("right", true)} 
            className={classes.button}>
            <MenuIcon className={classes.menuIcon}/> 
          </Button> :
          <Button  
            onClick={toggleDrawer("right", false)} 
            className={classes.button}>
            <MenuOpenIcon className={classes.menuIcon}/> 
          </Button>
        }
          <SwipeableDrawer
            classes={{ paper: classes.paper}}
            anchor="right"
            open={state.right}
            onOpen={toggleDrawer("right", true)}
            onClose={toggleDrawer("right",false)}
          >
            <List 
            className={classes.list}
            onClick={toggleDrawer("right", false)}
            onKeyDown={toggleDrawer("right", false)}>
              <Divider className={classes.divider} />
             <Link to='/Profile' style={{ textDecoration: 'none' }}>
                <ListItem button >
                <ListItemIcon className={classes.listItem}><AccountCircleIcon  /></ListItemIcon>
                <ListItemText className={classes.listItem} >My Account</ListItemText>
                </ListItem>
              </Link>

              <Link to='/Technique' style={{ textDecoration: 'none' }}>
                <ListItem button>
                <ListItemIcon className={classes.listItem}><MusicNoteIcon /></ListItemIcon>
                  <ListItemText className={classes.listItem}>Technique</ListItemText>
                </ListItem>
              </Link>

              <Link to='/Performance' style={{ textDecoration: 'none' }}>
                <ListItem button>
                <ListItemIcon className={classes.listItem}><MusicNoteIcon /></ListItemIcon>
                  <ListItemText className={classes.listItem}>Performance</ListItemText>
                </ListItem>
              </Link>

                <ListItem button onClick={signout}>
                    <ListItemIcon className={classes.listItem}><ExitToAppIcon /></ListItemIcon>
                    <ListItemText className={classes.listItem}>Sign out</ListItemText>
                </ListItem>
            </List>
            <Divider  />
          </SwipeableDrawer>
        </React.Fragment>
    </div>
  );
}
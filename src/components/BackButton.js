import React from 'react';
import {useHistory} from "react-router-dom";
import { makeStyles, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import themes from '../theme';

const styles = makeStyles((theme) => ({
    style: {
        color: themes.palette.primary.main,
        width: 30,
        height: 30,
    },
    button: {
        '&:focus': { 
            outline: 'none', //removes border around object when clicking
          }
    },
}));

const useStyles = styles;

 const BackButton = () => {
    let history = useHistory();
    const classes = useStyles();
    return(
        <>
        <Button onClick={() => history.goBack()} className={classes.button}>
            <ArrowBackIosIcon className={classes.style} />
        </Button>
        </>
    );
};
export default BackButton;
import React from 'react';
import {withStyles, Typography, Link, Divider} from '@material-ui/core';
import styles from './styles';

class Ownership extends React.Component {
    render() {
      const {classes} = this.props;
      return (
        <div>
        <Divider variant="middle" className={classes.divider} />
        <Typography variant="body2" color="textSecondary" align="center">
          
          <Link color="inherit" href="https://material-ui.com/">
      
          </Link>{' '}
       
          {'.'}
        </Typography>
        </div>
      );
    }
  }
  export default withStyles(styles)(Ownership);
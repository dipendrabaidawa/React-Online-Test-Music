import React from 'react';
import {Grid, Box, Typography, Button, withStyles} from '@material-ui/core';
import {Link} from 'react-router-dom';
import AccountBoxIcon from '@material-ui/icons/Person';
import styles from './styles';
import '../App.css'


class GuestButtons extends React.Component{


	render(){
		const {classes} = this.props;
	return(
		<>
			{/*Grid container that holds the Login buttons*/}
			<Grid container>
				<Grid item>
				<Box>
					<Link to='./Profile'>
					<AccountBoxIcon className={classes.accountBoxIcon}/>
					</Link>
				</Box>
				</Grid>
				<Grid item>
					<Link to="/Login">
						<Button variant="outlined" href="/Login" className={classes.acct_button}>
							<Typography className={classes.acct_button_lbl}>
								Login
							</Typography>
						</Button>
					</Link>
				</Grid>
				<Grid item>
					<Link to="/Register">
						<Button variant="outlined" href="/Register" className={classes.acct_button}>
							<Typography className={classes.acct_button_lbl}>Sign up</Typography>
						</Button>
					</Link>
				</Grid>
			</Grid>
		</>
	)
	}
}

export default withStyles(styles)(GuestButtons)

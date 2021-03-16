import React from 'react';
import {Grid, Box, Typography, Button, withStyles, Menu, MenuItem} from '@material-ui/core';
import {Link} from 'react-router-dom';

import styles from './styles';
import '../App.css'


class GuestButtons extends React.Component{
	constructor(props){
		super(props);
		this.state={username: props.username,
			    anchorEl: null
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
		this.signout = this.signout.bind(this);
	}

	handleClick(event){
		this.setState({anchorEl: event.currentTarget});
	};

	handleClose(){
		this.setState({anchorEl: null});
	};

	signout(){
		
	}
	render(){
		const {classes} = this.props;
	return(
		<>
			{/*Grid container that holds the Login buttons*/}
			<Grid container className={classes.decideContainer}>
				<Grid item>
				<Box>
				</Box>
				</Grid>
				<Grid item>
					<Typography className={classes.acct_dropdown}>
					{/*dropdown menu*/}
						<Button aria-controls="dropdownMenu" aria-haspopup="true" onClick={this.handleClick} className={classes.dropdownButton}>
							{this.state.username}
						</Button>

						<Menu
							id="dropdownMenu"
							anchorEl={this.state.anchorEl}
							keepMounted
							open={Boolean(this.state.anchorEl)}
							onClose={this.handleClose}
						>

							<MenuItem onClick={this.handleClose}> 
								<Link to='./Profile'> 
									Profile
								</Link>
							</MenuItem>
							<MenuItem onClick={this.handleClose}>
								<Link to='./Stats'>
									Stats
								</Link>
							</MenuItem>
							<MenuItem onClick={this.handleClose}>
								<Link to='./records'>
									Past Activities
								</Link>
							</MenuItem>
							{/*Implement logout function onClick here*/}
							<MenuItem onClick={this.signout}>Sign Out</MenuItem>
						</Menu>
					</Typography>
				</Grid>
			</Grid>
		</>
	)
	}
}

export default withStyles(styles)(GuestButtons)

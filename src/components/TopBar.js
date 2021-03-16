
import React from 'react';
import {withStyles, AppBar, Typography,Toolbar, Hidden} from '@material-ui/core';
import {Link} from 'react-router-dom';

import BackButton from './BackButton';
import styles from './styles';
import '../App.css'
import Sidebar from './Sidebar';
import SidebarPostLog from './SidebarPostLog';


class TopBar extends React.Component{
	constructor(props){
		super(props);
		this.state={authenticated: false, username: null, firstName: null};
	}
	

	render(){
		const {classes} = this.props;
	return(
		<> 
			<AppBar position="fixed" className={classes.navbar_body}>
				<Toolbar>
					<BackButton />
				<Link to="/home">
					
				</Link>
					<Hidden mdDown xsDown>
					<div className={classes.toolbarUsernameWrapper}>
					{this.state.authenticated 
							? <	Link to='/Profile' style={{ textDecoration: 'none' }}>
								<Typography className={classes.toolbarUsername}>{this.state.firstName}</Typography>
								</Link>
							:<></>  //using empty element as placeholder for nothing to be displayed
						}
					</div>
					</Hidden>
					<div className={classes.toolbarButtons}>
						{/* If user is logged in, display sidebar with login, otherwise, display default sidebar */}
						{this.state.authenticated 
							? <SidebarPostLog />
							: <Sidebar/>
						}
					</div>
				</Toolbar>
			</AppBar>
		</>
	)
	}
}

export default withStyles(styles)(TopBar)

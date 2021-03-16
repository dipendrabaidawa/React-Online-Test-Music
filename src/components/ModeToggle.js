import React from 'react';
import {Grid, Button} from '@material-ui/core';

class modeDropdown extends React.Component{
	constructor(props){
		super(props);
		this.state={userMode: props.userMode};
		this.modeToggled = this.modeToggled.bind(this);
	}
	
	modeToggled(){
		this.setState({userMode: !this.state.userMode});
		console.log("Mode in component: " + this.state.userMode);
		this.props.onDecided(this.state.userMode);
	}
	render(){
		return(
			<>
				<Grid container justify="flex-end">
						<Grid item className="menu-items"><Button onClick={this.modeToggled}
							 className="button active">
								{this.state.userMode ? 'Bootcamp':'Tournament'}
							</Button></Grid>
				</Grid>
				
			</>
		)
	}
}
export default modeDropdown

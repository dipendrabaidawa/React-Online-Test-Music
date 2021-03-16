//This is currently unused but may come in handy in the future
import React, {useState} from 'react';
import {Grid, Button, Box} from '@material-ui/core';
import {Link} from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
import './css/DropdownMenu.css';

class modeDropdown extends React.Component{
	constructor(props){
		super(props);
		//modeDropdown decides whether the two buttons are displayed or hidden, userMode sets the
		//mode in App.js to whatever the user selects
		this.state={modeDropdown: false, userMode: props.userMode};
	}
	
	render(){
		return(
			<>
				<div className="behindNav">
				
				//This container holds the buttons
				<Grid container justify="center" className={this.state.modeDropdown ? "dropdown active" : "dropdown"}>
						//The button classes are set to button.active(basically "show button")
						//When the arrow is selected
				
						//OnClick: set userMode in this component to 'Bootcamp' and send it to App.js
						<Grid item className="menu-items"><Button onClick={
							()=>{this.setState({userMode: 'Bootcamp'});
							this.props.onDecided(this.state.userMode);}}
							 className={this.state.modeDropdown ? "button active" : "button"}>
								Bootcamp
							</Button></Grid>
						//OnClick: set userMode in this component to 'Tournament' and send it to App.js
						<Grid item className="menu-items"><Button onClick={
							()=>{this.setState({userMode: 'Tournament'});
							this.props.onDecided(this.state.userMode)}}
							className={this.state.modeDropdown ? "button active" : "button"}>Tournament</Button></Grid>
				</Grid>
				
				//This container holds the ArrowDown icon
				<Grid container justify="center">
						<Box marginTop={5} className={this.state.modeDropdown ? "arrow active" : "arrow"}>
							//When button is clicked, set dropdown to the opposite of current state.
							<FaIcons.FaAngleDown onClick={()=>{this.setState({modeDropdown: !this.state.modeDropdown});}} 
							 /> 
						</Box>
				</Grid>
				</div>
			</>
		)
	}
}
export default modeDropdown
export const Buttons = ({modeDisplay}) => {

}

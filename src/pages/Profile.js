import React from 'react';

import {withStyles, Grid, Divider} from '@material-ui/core';
import styles from './styles';


class Profile extends React.Component{
	constructor(props){
		super(props);
		//intervalAssignments = all of a users past assignments combined
		this.state={intervalAssignments: [], chordsAssignments: [], scalesAssignments: [], dataCollectionComplete: null, assignmentsLoaded: false};
		this.printLoading = this.printLoading.bind(this);
		this.printAssignments = this.printAssignments.bind(this);
		this.loadAssignments = this.loadAssignments.bind(this);
	}
	//Function to print a statement while assignments are loading
	printLoading(){
		this.loadAssignments("Intervals");
		this.loadAssignments("Scales");
		this.loadAssignments("Chords");

		return("Loading...");
	}

	//Function to print assignments on the screen
	printAssignments(){
		return(
			<div>
			<h3>Intervals</h3>
				{this.state.intervalAssignments.map((assignment) => {
				//This doesn't work because "assignment" is not a single value but an object
				//though critically is also not an array.
					return(
						<>
						<p>{assignment.DateTimestamp}:<br />
						Note to sing: {assignment.noteToBeSung}<br />
						Score: {assignment.userScore}<br /></p>
						</>
					)
				
				})}
			<h3>Scales</h3>
				{this.state.scalesAssignments.map((assignment) => {
				//This doesn't work because "assignment" is not a single value but an object
				//though critically is also not an array.
					return(
						<>
						<p>{assignment.DateTimestamp}:<br />
						Scale to sing: {assignment.scaleToBeSung}<br />
						Score: {assignment.userScore}<br /></p>
						</>
					)
				
				})}
			<h3>Chords</h3>
				{this.state.chordsAssignments.map((assignment) => {
				//This doesn't work because "assignment" is not a single value but an object
				//though critically is also not an array.
					return(
						<>
						<p>{assignment.DateTimestamp}:<br />
						Chord to sing: {assignment.chordToBeSung}<br />
						Score: {assignment.userScore}<br /></p>
						</>
					)
				
				})}
			</div>
		);

	}

	//Load assignments into the component state
	loadAssignments(assignmentType){
		var tempintervalAssignments = [];
		
	}
	render(){
		const { classes } = this.props;
		return (
		<>
			<Grid container  justify='center' className={classes.profileContainer}>
				<Grid item  xs={12}>
					<h1 className={classes.techniqueHeader}>My Account</h1>
					<Divider variant="middle" className={classes.divider}/>
				</Grid>
				<div className="assignments">
					{
						//if assignment is loaded, printAssignments().
						this.state.assignmentsLoaded ?
							this.printAssignments()
							:this.printLoading()
					}
				</div>
			</Grid>
		</>
		);
	}
}

export default withStyles(styles)(Profile);

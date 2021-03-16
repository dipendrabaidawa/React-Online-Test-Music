/*
 * IntervalsChallenge:
    component that contains the intervals challenge
 * About:
    - Contains the piano graphic,
 */

// React & Core imports
import React from 'react';
import {Container, Col, Row, Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Konva from "konva";
import MidiHandler from './MidiHandler';

class DifficultySelect extends React.Component{
	//Determine difficulty type by using this.state.difficulty
	constructor(props){
		super(props);
		this.state = {difficulty: 'Bronze'};
		this.bronzeSelect = this.bronzeSelect.bind(this);
		this.silverSelect = this.silverSelect.bind(this);
		this.goldSelect = this.goldSelect.bind(this);
	}

	bronzeSelect(){
		this.setState({difficulty: 'Bronze'});
		console.log(this.state.difficulty);
	}

	silverSelect(){
		this.setState({difficulty: 'Silver'});
		console.log(this.state.difficulty);
	}
	
	goldSelect(){
		this.setState({difficulty: 'Gold'});
		console.log(this.state.difficulty);
	}

			render(){
			if(!this.props.difficultySelect){
				return(
					<>
						<div className="selectorBox">
						<Form>
							<h4>Select Difficulty:</h4>
							<Form.Check inline type={'radio'} onClick={this.bronzeSelect}  label={'Bronze'} name='difficulty'/>
							<Form.Check inline type={'radio'} onClick={this.silverSelect}  label={'Silver'} name='difficulty'/>
							<Form.Check inline type={'radio'} onClick={this.goldSelect}  label={'Gold'} name='difficulty'/>
						</Form>
						<p>{this.state.difficulty}</p>
						</div>
					</>
				);
			}
	}
}

export default DifficultySelect

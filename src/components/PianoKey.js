import React from "react";
import {Rect, Text} from "react-konva";

const NUM_WHITE_KEYS = 21;

class PianoKey extends React.Component {
	updateTimer = setInterval(this.updateHighlights.bind(this), 1000 / 15);
	constructor(props) {
		super(props);
		
		let y = this.getKeyY();
		let w = this.getKeyWidth();
		this.state = {
			y: y,
			width: w,
			height: this.getKeyHeight(),
			color: this.getKeyColor(),
			baseColor: this.getKeyColor(),
			pianoNoteDisplay: "",
			textX: this.getTextX(w),
			textY: this.getTextY(y),
		};
	}
	getTextY(y) {
		if(!this.props.black)
		{
			return y;
		}
		else
		{
			return y - 5;
		}
	}
	getTextX(width) {
		if(!this.props.black)
		{
			return width * .9;
		}
		else
		{
			return width * .6;
		}
		
		
	}
	getCanvasContainerHeight() {
		if(document.getElementById("game"))//fix edge case error when resizing outside of assignment
		{
			return document.getElementById("game").offsetHeight;
		}
		else
		{
			return 0
		}
	}
	getCanvasContainerWidth() {
		if(document.getElementById("game"))//fix edge case error when resizing outside of assignment
		{
			return document.getElementById("game").offsetWidth;
		}
		else
		{
			return 0
		}
	}
	getKeyHeight() 
	{
		if(!this.props.black)
		{
			return this.getCanvasContainerHeight() / NUM_WHITE_KEYS;
		}
		else
		{
			return 0.6 * this.getCanvasContainerHeight() / NUM_WHITE_KEYS;
		}		
	}
	getKeyWidth() {
		if(!this.props.black)
		{
			return  this.getCanvasContainerWidth() / 3;
		}
		else
		{
			return 0.571429 * this.getCanvasContainerWidth() / 3;
		}
		
		
	}
	getKeyY() {
		if(!this.props.black)
		{
			return this.props.i * this.getKeyHeight() + 1;
		}
		else
		{
			return (this.props.i * this.getCanvasContainerHeight() / NUM_WHITE_KEYS) - (0.5 * this.getKeyHeight());
		}
		
		
	}
	getKeyColor() {
		if(!this.props.black)
		{
			return "#fffff0";
		}
		else
		{
			return "#000000";
		}
	}
	getTextColor() {
		if(!this.props.black)
		{
			return "#1f1f1f";
		}
		else
		{
			return "#dfdfdf";
		}
	}
	green_highlight() {
		if(!this.props.black)
		{
			this.setState(
				{
					color: "#ccffcc",
					pianoNoteDisplay: this.props.pianoNote,
				}
			);
		}
		else
		{
			this.setState(
				{
					color: "#083308",
					pianoNoteDisplay: this.props.pianoNote,
				}
			);
		}
		
		
	}
	red_highlight() {
		if(!this.props.black)
		{
			this.setState(
				{
					color: "#ffcccc",
					pianoNoteDisplay: this.props.pianoNote,
				}
			)
		}
		else
		{
			this.setState(
				{
					color: "#440808",
					pianoNoteDisplay: this.props.pianoNote,
				}
			)
		}	
	}
	highlight()
	{
		if(this.props.black)
		{
			this.setState(
				{
					color: "#ff80ff",
					pianoNoteDisplay: this.props.pianoNote,
				}
			)
		}
		else
		{
			this.setState(
				{
					color: "#3434ff",
					pianoNoteDisplay: this.props.pianoNote,
				}
			)
		}
	}
	remove_highlight() {
		this.setState({
			color: this.state.baseColor,
			pianoNoteDisplay: "",
		});
	}
	updateDimensions() {
		let y = this.getKeyY();
		let w = this.getKeyWidth();
		this.setState({
			y: y,
			width: w,
			height: this.getKeyHeight(),
			textX: this.getTextX(w),
			textY: this.getTextY(y),
		});
	}
	updateHighlights() {
		if(this.props.highlight)
		{
			this.highlight()
		}
		else
		{
			this.remove_highlight()
		}
		/*if (this.props.noteBeingSung === null) {
			// if both are null
			if (this.props.noteToBeSung === null) {
				this.remove_highlight();
				return;
			}
			
			let goal = this.props.noteToBeSung % 12;
			let myPitch = this.props.pitch % 12;
			
			// if not singing when there is a correct note
			if (myPitch === goal) {
				this.red_highlight();
				return;
			}
			else {
				this.remove_highlight();
				return;
			}
		}
		else if(this.props.noteToBeSung === null) {
			let actual = this.props.noteBeingSung % 12;
			let myPitch = this.props.pitch % 12;
			
			// If singing a note when there shouldn't be a sung note
			if (myPitch === actual) {
				this.red_highlight();
				return;
			}
			else {
				this.remove_highlight();
				return;
			}
		}
		else {
			let goal = this.props.noteToBeSung;
			let actual = this.props.noteBeingSung;
			let myPitch = this.props.pitch;
			if (myPitch === goal) {
				if (myPitch === actual) {
					this.green_highlight();
				}
				else {
					this.red_highlight();
				}
			}
			else {
				if (myPitch === actual) {
					this.red_highlight();
				}
				else {
					this.remove_highlight();
				}
			}
			return;
		}*/
	}
	componentDidMount() {
		this.updateDimensions();
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	render() {
		return (
			<>
				{/* Piano Key itself should be on top*/}
				<Rect
					x={-3}
					y={this.state.y}
					width={this.state.width}
					height={this.state.height}
					fill={this.state.color}
					shadowBlur={3}
					cornerRadius={3}
				/>
				<Text fill={this.getTextColor()} fontSize={18} text={this.state.pianoNoteDisplay} y={this.state.textY} x={this.state.textX}/>
			</>
		);
	}
}
export default PianoKey;
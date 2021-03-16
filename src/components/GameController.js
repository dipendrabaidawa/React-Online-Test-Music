/*
 * The controller used for games
 * - Visual/CSS Notes:
 *  - This component is designed to fill the full width/height of its parent container.
 *  - Do take care to give it a well-thought out home keeping the above statement in mind.
 * - Interfaces with:
 *  - MidiPlayer to obtain & play sounds
 *  - GameVisual to display notes, schedule of notes, and results of events (midiplayer, button control, audio pickup)
 *  - PitchDetector to receive mic input
 *  - TODO Grader to send raw output to
 *  - TODO UserPreferences to taken in display preferences/etc
 * TODO remainder of comments
 */

import React from 'react';
import PitchDetector from "./PitchDetector";
import MidiHandler from './MidiHandler';
import GameVisualOP from "./GameVisual";
import Button from "react-bootstrap/Button";


class GameController extends React.Component {
	constants = {
		smallestNoteMidiId: 60,
		largestNoteMidiId: 71,
		numberOfWhiteNotes: 7,
	};
	updateFunctionHandle = null;
	constructor(props) {
		super(props);
		this.child = React.createRef();
		this.pitchDetector = React.createRef();
		this.state = {
			// Audio Samples
			frequencySamples: [],
			// Graphic Settings
			graphicDimensions: {
				canvas: {
					height: 1,
					width: 1,
				},
				whiteKey: {
					height: 1,
					width: 1,
				},
				blackKey: {
					height: 1,
					width: 1,
				},
			},
			colors: {
				backdrop: "#2f2f2f",
				whiteKey: {
					base: "#fffffa",
					highlightCorrect: "#bbffbb",
					highlightIncorrect: "#ffbbbb",
				},
				blackKey: {
					base: "#000000",
					highlightCorrect: "#005000",
					highlightIncorrect: "#702222",
				},
			},
			noteSchedule: {
				delay: 1000,
				notes: [
					// Dummy Data
					{
						midiId: 60,
						y: 60,
						startTime: 0,
						duration: 400,
					},
					{
						midiId: 61,
						y: 61,
						startTime: 500,
						duration: 100
					},
					{
						midiId: 64,
						y: 64,
						startTime: 800,
						duration: 1200,
					},
				],
			},
			keyYPositions: {
				white: [],
				black: [],
			},
		};
	}
	getCanvasWidth() {
		return document.getElementById("game-controller-container").offsetWidth;
	}
	getCanvasHeight() {
		return document.getElementById("game-controller-container").offsetHeight;
	}
	getBlackKeyWidth() {
		return this.getWhiteKeyWidth() * 0.6;
	}
	getWhiteKeyWidth() {
		return this.state.graphicDimensions.canvas.width / 3;
	}
	getBlackKeyHeight() {
		return this.getWhiteKeyHeight() * 0.6;
	}
	getWhiteKeyHeight() {
		return this.state.graphicDimensions.canvas.height / this.constants.numberOfWhiteNotes;
	}
	isMidiIdFlat(midiId) {
		switch (midiId % 12) {
			case 1:// C#
			case 3:// D#
			case 6:// F#
			case 8:// G#
			case 10:// A#
				return true;
			default:
				return false;
		}
	}
	getBlackKeyY(blackNoteMidiId) {
		// getWhiteKey(id - 1) to get position of the white key
		let whiteKeyY = this.getWhiteKeyY(blackNoteMidiId - 1);
		
		// Subtract half of the black key height
		return whiteKeyY - (0.5 * this.state.graphicDimensions.blackKey.height);
	}
	getWhiteKeyY(whiteNoteMidiId) {
		let whiteNoteMidiIdFromMin = whiteNoteMidiId - this.constants.smallestNoteMidiId;
		let noteInTwelve = whiteNoteMidiIdFromMin % 12;
		let noteLevel = (whiteNoteMidiIdFromMin - noteInTwelve) / 12;
		
		let whiteKeyFlatOffset = 0;
		switch (noteInTwelve) {
			case 0:
			case 1: // C, C#
				whiteKeyFlatOffset = 0;
				break;
			case 2:
			case 3: // D, D#
				whiteKeyFlatOffset = 1;
				break;
			case 4: // E
				whiteKeyFlatOffset = 2;
				break;
			case 5:
			case 6: // F, F#
				whiteKeyFlatOffset = 3;
				break;
			case 7:
			case 8: // G, G#
				whiteKeyFlatOffset = 4;
				break;
			case 9:
			case 10: // A, A#
				whiteKeyFlatOffset = 5;
				break;
			case 11: // B
				whiteKeyFlatOffset = 6;
				break;
			default:
				alert("What magic is this: " + noteInTwelve);
				break;
		}
		
		let reversedWhiteIndex = (this.constants.numberOfWhiteNotes - 1) - ((noteLevel * 7) + whiteKeyFlatOffset)
		let yVal = this.state.graphicDimensions.whiteKey.height * (reversedWhiteIndex);
		console.log("Y of midiID (" + whiteNoteMidiId + ") = " + yVal);
		return yVal;
	}
	updateDimensions() {
		this.setState({
			graphicDimensions: {
				canvas: {
					height: this.getCanvasHeight(),
					width: this.getCanvasWidth(),
				},
				whiteKey: {
					height: this.getWhiteKeyHeight(),
					width: this.getWhiteKeyWidth(),
				},
				blackKey: {
					height: this.getBlackKeyHeight(),
					width: this.getBlackKeyWidth(),
				},
			}
		});
		
		let newWPos = [];
		let newBPos = [];
		for (let midiId = this.constants.smallestNoteMidiId; midiId < this.constants.largestNoteMidiId; midiId++) {
			if (this.isMidiIdFlat(midiId)) {
				newBPos.push(this.getBlackKeyY(midiId));
			}
			else {
				newWPos.push(this.getWhiteKeyY(midiId));
			}
		}
		
		this.setState({
			keyYPositions: {
				white: newWPos,
				black: newBPos,
			}
		})
	}
	update() {
		if (this.state.frequencySamples.length === 30) {
			window.clearInterval(this.updateFunctionHandle);
			return;
		}
		
		// let pitch = this.pitchDetector.current.getPitch();
		//
		// if (pitch > 7) {
		// 	this.setState({
		// 		frequencySamples: this.state.frequencySamples.concat(pitch),
		// 	});
		// }
	}
	componentDidMount() {
		// Start Pitch Detection
		this.pitchDetector.current.start();
		
		// Mount Update
		this.updateFunctionHandle = setInterval(this.update.bind(this), 1000 / 30);
		
		// Mount UpdateDimensionsOnResize
		window.addEventListener("resize", this.updateDimensions.bind(this));
	}
	componentWillUnmount() {
		// Stop Pitch Detection
		this.pitchDetector.current.stop();
		
		// Dismount Update
		window.clearInterval(this.updateFunctionHandle);
		
		// Dismount UpdateDimensionsOnResize
		window.removeEventListener("resize", this.updateDimensions.bind(this));
	}
	debugA() {
		alert("A was pressed");
	}
	debugB() {
		alert("B was pressed");
	}
	debugC() {
		alert("C was pressed");
	}
	render() {
		return (
			<div id={"game-controller-container"} style={{width: "100%", height: "100%"}}>
				<GameVisualOP
					// Objects
					constants={this.constants}
					keyYPositions={this.state.keyYPositions}
					dimensions={this.state.graphicDimensions}
					colors={this.state.colors}
					noteSchedule={this.state.noteSchedule}
				/>
				<Button
					onClick={this.debugA.bind(this)}>
					Debug A
				</Button>
				<Button
					onClick={this.debugB.bind(this)}>
					Debug B
				</Button>
				<Button
					onClick={this.debugC.bind(this)}>
					Debug C
				</Button>
				<PitchDetector ref={this.pitchDetector}/>
			</div>
		);
	}
}

export default GameController;
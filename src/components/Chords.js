/*
 * IntervalsChallenge:
    component that contains the intervals challenge
 * About:
    - Contains the piano graphic,
 */

// React & Core imports
import React from 'react';
import {withStyles} from '@material-ui/core';
import styles from '../pages/styles';
import {NotesData, Chords} from './MidiData'

const PIANO = 0;
const METRONOME = 1227;
const HIGH = 83;
const LOW = 48;

class ChordsChallenge extends React.Component {
    constructor(props) {        
        super(props);        
        this.state = {           
            notesToBeSung: null,
            rnotesToBeSung: null,
            notesToPlay: [],
            rnotesToPlay:[], 
            IntervalName: '',
            scores: [],             
        };
    }
    componentDidMount(){
        this.new()
    }
    getChord() {
        var inside = false
        var ntes
        var chord
        //check if chord is inside piano to avoid index out of bounds
        do{
            //pick random note (A,A#/Bd,B,C...)
            const index = Math.floor(Math.random()*NotesData.names.length)
            const notes = NotesData.pitches[index]
            //pick random note on keybord from note letter
            const note = notes[Math.floor(Math.random()*notes.length)]
            //get random chord
            const index2 = Math.floor(Math.random()*Chords.names.length) 
            chord = Chords.names[index2]
            ntes = [note, note + Chords.semi[index2*2],note + Chords.semi[index2*2+1]]
            var i = 0
            //if any note in the chord is out of bounds loop again
            for(i=0;i<ntes.length;i++)
            {
                if(ntes[i]<LOW || ntes[i]>HIGH)
                {
                    i = 100
                }
            }
            if(i < 100)
            {
                inside = true
            }
        }while(!inside)
        this.setState({name: chord, notes: ntes})
        return ["this "+chord + " chord", ntes]
    }
    getlesson(){
        return([
            this.state.notesToPlay,
            this.state.scores,
            this.state.notesToBeSung,
            this.state.ChordName,
        ])
    }
    new(){
        //grab a new interval
        const chord = this.getChord()  
        var i = 0
        //set up so that (old) pianoNote could be set up
        var play = []
        var rplay = []
        var scores = []
        rplay.push(
            {
                midiId: 60,
                duration: .2 * 1000,
                startTime: 0*1000,
                instrument: METRONOME
            },
            {
                midiId: 60,
                duration: .2 * 1000,
                startTime: 1*1000,
                instrument: METRONOME
            },
            {
                midiId: 60,
                duration: .2 * 1000,
                startTime: 2*1000,
                instrument: METRONOME
            },
            {
                midiId: 60,
                duration: .2 * 1000,
                startTime: 3*1000,
                instrument: METRONOME
            }
        )
        for(i=0;i<chord[1].length;i++)
        {
            play.push(
                {
                    midiId: chord[1][i],
                    duration: 1 * 1000,
                    startTime: 0 * 1000,
                    instrument: PIANO
                }
            )
            rplay.push(
                {
                    midiId: chord[1][i],
                    duration: 1 * 1000,
                    startTime: (i+4) * 1000,
                    instrument: PIANO
                }
            )
            scores.push(0)
        }
        //used to tell when to stop playing  and recording on the last note
        play.push(
            {
                midiId: 80,
                duration: 0,
                startTime: 1 * 1000,
                instrument: PIANO
            }
        )
        rplay.push(
            {
                midiId: 80,
                duration: 0,
                startTime: (chord[1].length+4) * 1000,
                instrument: PIANO
            }
        )
        this.setState({
            notesToPlay: play,
            rnotesToPlay: rplay,
            scores: scores,
            ScaleName: chord[0], 
            notesToBeSung: chord[1],
            rnotesToBeSung:chord[1]
        },() => 
        {
            console.log(this.state)
        })

        return([
            play,
            scores,
            chord[1],
            chord[0],
        ])
    }
    render() {
	    return (
		<div ></div>
        );
    }
}

export default withStyles(styles)(ChordsChallenge);

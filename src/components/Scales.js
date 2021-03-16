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
import {NotesData, Scales} from './MidiData'

const PIANO = 0;
const METRONOME = 1227;
const HIGH = 83;
const LOW = 48;

class ScalesChallenge extends React.Component {
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
    getScale()
    {
        var inside = false
        var ntes
        var scale
        //var noteName
        var scaleName

        //check if scale is inside piano to avoid index out of bounds
        do{
            //pick random note (A,A#/Bd,B,C...)
            const index = Math.floor(Math.random()*NotesData.names.length)
            //noteName = NotesData.names[index]
            const notes = NotesData.pitches[index]
            //pick random note on keybord from note letter
            const note = notes[Math.floor(Math.random()*notes.length)] 
            //get random scale
            const index2 = Math.floor(Math.random()*Scales.names.length)
            scale = Scales.scales[index2]
            scaleName = Scales.names[index2]
            var i = 0

            for(i=0;i<scale.length;i++)
            {
                scale[i] = scale[i] + note
            }
            ntes = [note].concat(scale)
            console.log(ntes)
            //if any note in the scale is out of bounds loop again
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
        return ["a " + scaleName+ " scale", ntes] 
    }
    getlesson(){
        return([
            this.state.notesToPlay,
            this.state.scores,
            this.state.notesToBeSung,
            this.state.ScaleName,
        ])
    }	
    new(){
        //grab a new scale
        const scale = this.getScale()   
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
        for(i=0;i<scale[1].length;i++)
        {
            play.push(
                {
                    midiId: scale[1][i],
                    duration: 1 * 1000,
                    startTime: (i+0)*1000,
                    instrument: PIANO
                }
            )
            rplay.push(
                {
                    midiId: scale[1][i],
                    duration: 1 * 1000,
                    startTime: (i+4)*1000,
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
                startTime: (scale[1].length)*1000,
                instrument: PIANO
            }
        )
        rplay.push(
            {
                midiId: 80,
                duration: 0,
                startTime: (scale[1].length+4)*1000,
                instrument: PIANO
            }
        )
        this.setState({
            notesToPlay: play,
            rnotesToPlay: rplay,
            scores: scores,
            ScaleName: scale[0], 
            notesToBeSung: scale[1],
            rnotesToBeSung: scale[1]
        },() => 
        {
            console.log(this.state)
        })
        return([
            play,
            scores,
            scale[1],
            scale[0],
        ])
    }
    render() {
	    return (
            <div></div>
        )
    }
}

export default withStyles(styles)(ScalesChallenge);

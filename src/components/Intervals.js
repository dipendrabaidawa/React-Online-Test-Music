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
import {NotesData, Interval} from './MidiData'

const PIANO = 0;
const METRONOME = 1227;
const HIGH = 83;
const LOW = 48;


class IntervalsChallenge extends React.Component {
    constructor(props) {        
        super(props);   
        console.log("intervalsChallenge: ", props);
        this.state = {           
            notesToBeSung: null,
            rnotesToBeSung: null,
            notesToPlay: [],
            rnotesToPlay:[], 
            IntervalName: '',
            scores: [],             
        };
    }
    componentDidMount() {
       this.new()
    }
    getInterval() {
        var inside = false
        var ntes
        var interval
        var noteName
        var ud
        //pick if interval goes up or down from root
        if(Math.random() >= .5)
        {
            ud = "above"
        }
        else
        {
            ud = "below"
        }
        //check if chord is inside piano to avoid index out of bounds
        do{
            //pick random note (A,A#/Bd,B,C...)
            const index = Math.floor(Math.random()*NotesData.names.length)
            noteName = NotesData.names[index]
            const notes = NotesData.pitches[index]
            //pick random note on keybord from note letter
            const note = notes[Math.floor(Math.random()*notes.length)]  
            //get random interval
            const index2 = Math.floor(Math.random()*Interval.names.length)
            interval = Interval.names[index2]
            if(ud === "above" )
            {
                ntes = [note, note + index2]
            }
            else
            {
                ntes = [note, note - index2]
            }
            var i = 0
            //if any note in the interval is out of bounds loop again
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

        this.setState({name: interval+ " " + ud + " " + noteName, notes: ntes})    
        return [interval+ " " + ud + " " + noteName, ntes]         
    } 
    getlesson(){
        return([
            this.state.notesToPlay,
            this.state.scores,
            this.state.notesToBeSung,
            this.state.IntervalName,
        ])
    }
    new() {
        //grab a new interval
        const interv = this.getInterval();
        //set up so that (old) pianoNote could be set up
        var play = []
        var rplay = []
        var scores = []
        play.push(
            {
                midiId: interv[1][0],
                duration: 1 * 1000,
                startTime: 0*1000,
                instrument: PIANO
            },
            {
                midiId: 80,
                duration: 0,
                startTime: 1*1000,
                instrument: PIANO
            }
        )
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
            },
            {
                midiId: interv[1][1],
                duration: 1 * 1000,
                startTime: 4*1000,
                instrument: PIANO
            },
            {
                midiId: 80,
                duration: 0,
                startTime: 5*1000,
                instrument: PIANO
            }
        )
        this.setState({
            notesToPlay: play,
            rnotesToPlay: rplay,
            scores: scores,
            IntervalName: interv[0],
            notesToBeSung: [interv[1][0]],
            rnotesToBeSung: [interv[1][1]],
        },() =>
        {
            console.log(this.state)
        })
        return([
            play,
            scores,
            [interv[1][0]],
            interv[0],
        ])
    }
    render() {
        return (
		    <div></div>
        );
    }
}

export default withStyles(styles)(IntervalsChallenge);
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import MidiHandler from '../components/MidiHandler';
import PitchDetector from '../components/PitchDetector'
import Score from '../components/score'
import PianoKey from "../components/PianoKey";
import {Layer, Rect, Stage} from "react-konva";
import piano from '../components/pianoNotes.json'
import Intervals from '../components/Intervals';
import Chords from '../components/Chords';
import Scales from '../components/Scales'
import MicRecorder from 'mic-recorder-to-mp3';
const NUM_WHITE_KEYS = 21;

const Mp3Recorder = new MicRecorder({ bitRate: 128 });

class lesson extends React.Component {
    updateTimer = null;
    recordSetTimeoutId = null;
    constructor(props) {        
        super(props);        
        this.state = {
            noteColor: '',
            cornerRadius: 10,
            freqBeingSung: null,
            height: 0,
            noteBeingSung: null,           
            notesToBeSung: null,
            notesToPlay: [], 
            record: false,
            LessonName: '',
            score:0,
            scores: [],
            stageHeight: 200,
            stageWidth: 200,
            width: 1000,
            x: [],
			y: [],
            PRColorChange: [], 
            init: false              
        };
        this.play = this.play.bind(this)
    }
    componentDidMount(){        
        this.checkSize();
		window.addEventListener("resize", this.checkSize);
        this.updateTimer = setInterval(this.update.bind(this), 1000 / 60);    
    }
    update() {
        if(!this.state.init && this.lessonType)
        {
            this.new()
            this.setState({
                init: true
            })
        }
        
        var i = 0
        let prevX = this.state.x;
        let pr = []
        let stoped = false
        for(i = 0;i < prevX.length;i++)
        {
            if(prevX[i] > this.state.stageWidth/3-1000 && prevX[i] < this.state.stageWidth/3 && i !== prevX.length-1 && this.state.notesToPlay[i].instrument === 0)
            {
                pr.push(this.state.notesToPlay[i].midiId)
            }
            if(prevX[i] > this.state.stageWidth/3-1000/480 && prevX[i] < this.state.stageWidth/3+1000/480)
            {
                if(!stoped)
                {
                    this.midi.stop()
                    stoped = true
                }
                if(!this.state.record)
                {                    
                    //if it is not the check note play note
                    if(i !== prevX.length-1)
                    { 
                        this.midi.play([this.state.notesToPlay[i].midiId],this.state.notesToPlay[i].instrument)
                    }
                }
                else
                {
                    if(i > 4)
                    {
                        var current = this.pitch.getCurrent();
                        if(current) {
                            var sung = current[1];
                            var freq = current[0];
                        }
                        var scores = this.state.scores;
                        console.log(this.state.noteToBeSung);
                        scores[i-5] = this.score.getScore(freq,this.state.noteToBeSung)
                        console.log("++++++++", sung,freq,scores)
                        if(sung && freq){
                        
                            this.setState({
                                noteBeingSung: sung,
                                freqBeingSung: freq,
                                scores: scores                
                            },() => 
                            {
                                console.log(this.state.scores,this.state.noteToBeSung)
                                this.pitch.clearpitches() 
                                console.log(this.state.scores,"reset")                        
                            })
                        }
                        if(i === prevX.length - 1 )
                        {
                            this.pitch.stop()
                            var score = 0
                            var j = 0
                            for(j=0;j<this.state.notesToBeSung.length-1;j++)
                            {
                                score = score + this.state.scores[j]
                            }
                            console.log(score / (this.state.notesToBeSung.length), " --- ",score," --- ",this.state.notesToBeSung.length)
                            score = Math.floor(score / (this.state.notesToBeSung.length))
                            this.setState({
                                record: false,
                                score: score
                            },() =>
                            {
                                console.log(this.state.scores)
                            })
                        }
                    }
                    else if(i<4)
                    {                    
                        //if it is not the check note play note
                        if(i !== prevX.length-1)
                        { 
                            this.midi.play([this.state.notesToPlay[i].midiId],this.state.notesToPlay[i].instrument)
                        }
                    }
                    else
                    {
                        this.pitch.clearpitches() 
                        console.log("reset")  
                    }
                    if(i !== prevX.length - 1 && this.state.notesToPlay[i].instrument === 0)
                    {
                        this.setState({
                            noteToBeSung: this.state.notesToBeSung[i-4]
                        },() => 
                        {
                            console.log(this.state.noteToBeSung)                       
                        })
                    }
                    
                }
            }
            
            //move notes
            prevX[i] -= 1000/60
        }        
        this.setState({
            x: prevX,	
            PRColorChange: pr			 
        })       
    }    
    play(rec = false){         
        this.pitch.stop()
        var notes = null
        if(rec === true)
        {
            notes = this.lessonType.state.rnotesToPlay
        }
        else
        {
            notes = this.lessonType.state.notesToPlay   
            rec = false
        }
        this.setState({
            notesToPlay: notes,
            notesToBeSung: this.lessonType.state.notesToBeSung,
            noteColor: notes.map((note) => this.pitchToColor(note.midiId)),
            height: notes.map((note) => this.pitchToHeight(note.midiId)),
            midiID: notes.map((note) => note.midiId),
            width: notes.map((note) => note.duration),
            y: notes.map((note) => this.pitchToY(note.midiId,note.instrument)),
            x: notes.map((note) => this.state.stageWidth/3 + 1000 + note.startTime),
            record: rec,
        },() =>{
            console.log("set state:", this.state);
        })
        this.midi.stop();
    }
    record(){
        if (this.recordSetTimeoutId != null) clearTimeout(this.recordSetTimeoutId);
        console.log("on recording notes: ", this.lessonType.state.rnotesToPlay);
        this.pitch.stop();      
        this.pitch.start();
        Mp3Recorder.start();
        this.midi.stop();
        this.recordSetTimeoutId = setTimeout(() => {          
            Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {
                const blobURL = URL.createObjectURL(blob)
                this.setState({ blobURL, isRecording: false });
            })           
        }, 11000);

        
        this.setState({
            record: true,
            noteToBeSung: this.state.notesToBeSung[0]
        })        
        this.play(true)
    }
    new(){     
        //grab a new lesson
        this.pitch.stop()
        this.midi.stop()
        const lesson = this.lessonType.new()
        console.log("lessonType: ", this.lessonType, lesson);
        var play = lesson[0]
        var scores = [1]
        this.setState({
            notesToBeSung: lesson[2],
            noteToBeSung: lesson[2][0],
            LessonName: lesson[3],
            scores: scores,
        },() => 
        {
            console.log(this.state)
        })
        this.lessonType.setState({
            x: play.map((note) => this.state.stageWidth/3 + 1000 + note.startTime)
        })
    }
    checkSize = () => {
		const canvasContainerHeight = document.getElementById("game").offsetHeight + 2;
		const canvasContainerWidth = document.getElementById("game").offsetWidth;
		this.setState({
			stageWidth: canvasContainerWidth,
			stageHeight: canvasContainerHeight,
		});
    }
    pitchToY(pitchMidiId, inst) {
        //console.log(pitchMidiId)
        let wkeyId = 1.5
        if(pitchMidiId < 84 && pitchMidiId > 47)
        {
            wkeyId = piano[pitchMidiId-piano[0].pitch].idkwhattonamethis;
        }
        
        let wKeyHeight = document.getElementById("game").offsetHeight / NUM_WHITE_KEYS;
        
        let y = wkeyId * wKeyHeight;
        
        if (this.isMidiIdFlat(pitchMidiId)) {
            y -= (0.3 * wKeyHeight);
        }
        if(inst !== 0)
        (
            y = -50
        )
        
        return y; 		
    }
    isMidiIdFlat(midiId) {
		let pos = midiId % 12;
		return (
			pos === 1 ||
			pos === 3 ||
			pos === 6 ||
			pos === 10 ||
			pos === 8
		);
    }
    pitchToHeight(midiId) {
		let wKeyHeight = document.getElementById("game").offsetHeight / NUM_WHITE_KEYS;
		if (this.isMidiIdFlat(midiId)) {
			wKeyHeight *= 0.6;
		}
		return wKeyHeight;
	}
	pitchToColor(midiId) {
        if(midiId === 0)
        {
            return "#fff"
        }
		else if (!this.isMidiIdFlat(midiId)) {
			return "#8080ff";
		}
		else {
			return "#ffccff";
		}
    }	    
    componentWillUnmount() {
        clearInterval(this.updateTimer);
        window.removeEventListener("resize", this.checkSize);
        this.midi.stop()
        this.pitch.stop()
    }
    render() {

        const less = []
        if(this.props.lessonType === 1)
        {
            less.push(<Intervals ref={ref => (this.lessonType = ref)} buttonState={this.props.buttonState} />)
        }
        else if(this.props.lessonType === 2)
        {
            less.push(<Chords ref={ref => (this.lessonType = ref)} buttonState={this.props.buttonState} />)
        }
        else if(this.props.lessonType === 3)
        {
            less.push(<Scales ref={ref => (this.lessonType = ref)} buttonState={this.props.buttonState} />)
        }
        else
        {
            less.push(<Scales ref={ref => (this.lessonType = ref)} buttonState={this.props.buttonState} />)
        }


        const notes = this.state.notesToPlay.map((note) => note.midiId)
		const items = []
		for (const [index] of notes.entries()) {
			items.push(
				<Rect 
					x={this.state.x[index]}
					y={this.state.y[index]}
					width={this.state.width[index]}
					height={this.state.height[index]}
					fill={this.state.noteColor[index]}
					cornerRadius={this.state.cornerRadius}
				/>
			)
		}
	    return (
		<div >
            <Container fluid>
                <Row>
                    <Col id={"game"} style={{height: window.innerHeight * (2/3), paddingLeft: 0, paddingTop: 0}} lg={8} xs={12}>
                    <Stage width={this.state.stageWidth} height={this.state.stageHeight}>
                            <Layer>
                                <Rect
                                    x={0}
                                    y={0}
                                    fill={"#2f2f2f"}
                                    width={this.state.stageWidth}
                                    height={this.state.stageHeight}
                                />
                            </Layer>
                            <Layer>
                                <>
                                    {items}
                                </>
                            </Layer>
                            <Layer>
                            {
                                piano.map((note) => {
                                    if (!note.sharp) {
                                        if(this.state.PRColorChange.includes(note.pitch))
                                        {                                                
                                            return <PianoKey black={false} key={note.pitch} pitch={note.pitch}
                                                noteBeingSung={this.props.noteBeingSung}
                                                noteToBeSung={this.props.noteToBeSung} pianoNote={note.name}
                                                i={note.idkwhattonamethis} stageWidth={this.state.stageWidth}
                                                stageHeight={this.state.stageHeight} highlight={true}/>
                                        }
                                        else
                                        {
                                            return <PianoKey black={false} key={note.pitch} pitch={note.pitch}
                                                noteBeingSung={this.props.noteBeingSung}
                                                noteToBeSung={this.props.noteToBeSung} pianoNote={note.name}
                                                i={note.idkwhattonamethis} stageWidth={this.state.stageWidth}
                                                stageHeight={this.state.stageHeight} highlight={false}/>
                                        }
                                    }
                                    return(
                                        <></>
                                    )
                                })
                            }
                            {
                                piano.map((note) => {
                                    if (note.sharp) {
                                        if(this.state.PRColorChange.includes(note.pitch))
                                        {
                                            return <PianoKey black={true} key={note.pitch} pitch={note.pitch}
                                                noteBeingSung={this.props.noteBeingSung}
                                                noteToBeSung={this.props.noteToBeSung} pianoNote={note.name}
                                                i={note.idkwhattonamethis} stageWidth={this.state.stageWidth}
                                                stageHeight={this.state.stageHeight} highlight={true}/>
                                        }
                                        else
                                        {
                                            return <PianoKey black={true} key={note.pitch} pitch={note.pitch}
                                                noteBeingSung={this.props.noteBeingSung}
                                                noteToBeSung={this.props.noteToBeSung} pianoNote={note.name}
                                                i={note.idkwhattonamethis} stageWidth={this.state.stageWidth}
                                                stageHeight={this.state.stageHeight} highlight={false}/>
                                        }
                                    }
                                    return(
                                        <></>
                                    )
                                })
                            }
                            </Layer>
                        </Stage>
                    </Col>
                    <Col xs={12}>
                        <Row>
                            <Col>
                                <div style={{paddingLeft: '0px', paddingRight: '0px', width: '100%', height: '100%'}}>
                                    <h2>Sing {this.state.LessonName}</h2>
                                    <h2>score: {this.state.score}</h2>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ButtonGroup>
                                    <Button onClick = {this.play.bind(this)}>
                                        Play
                                    </Button>
                                    <Button onClick = {this.record.bind(this)}>
                                        Record
                                    </Button>
                                    <Button onClick = {this.new.bind(this)}>
                                        New
                                    </Button>
                                    <audio src={this.state.blobURL} controls="controls" />
                                </ButtonGroup>
                            </Col>
                            <Col>
                                <MidiHandler ref={ref => (this.midi = ref)}/>
                            </Col>
                            
                        </Row>
                    </Col>
                </Row>
            </Container>            
            <PitchDetector noteToBeSung={this.state.noteToBeSung} ref={ref => (this.pitch = ref)}/>
            <Score noteToBeSung={this.state.noteToBeSung} freqBeingSung = {this.state.freqBeingSung} ref={ref => (this.score = ref)}/>
            <div >
                {less}
            </div>
		</div>
        )
    }
}

export default lesson;

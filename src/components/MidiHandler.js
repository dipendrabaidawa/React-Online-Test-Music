import React from 'react';
import MIDISounds from 'midi-sounds-react';


//NEED TO BE CHANGED IF PIANO CHANGES

class MidiHandler extends React.Component {
	constructor(props) {
        super(props);
        this.play = this.play.bind(this)
        this.stop = this.stop.bind(this)
		this.state = {
            name: '',
            notes: [],
            instrument: 0
        };
	}
	componentDidMount() {
        this.envelopes=[];
        this.midiSounds.setEchoLevel(0)
    }    
       
	play(notes, inst = 0){
        if (inst !== this.state.instrument)
        {
            this.setState({
                selectedInstrument: inst
                ,cached:false
            });
            this.midiSounds.cacheInstrument(inst);            
            var me=this;
            this.midiSounds.player.loader.waitLoad(function () {
                me.setState({
                    selectedInstrument: inst
                    ,cached:true
                });
            });
        }
        console.log("notes: ", notes);
		var when=this.midiSounds.contextTime();
        //var b=60/89;
        for(var i = 0; i < notes.length; i++){
            this.envelopes[i]=this.midiSounds.player.queueWaveTable(this.midiSounds.audioContext, this.midiSounds.equalizer.input, window[this.midiSounds.player.loader.instrumentInfo(inst).variable], when, notes[i], 1.2, 42/127);
        }
    }
    stop() { 
        console.log("stop")
        for(var i = 0; i < this.envelopes.length;i++)
        {
            this.envelopes[i].cancel()
        }  
    }
    
    render() {
        return (
            <div style={{display: 'none',width: '0%', height: '0%'}}>
                <MIDISounds 
                ref={(ref) => (this.midiSounds = ref)} 
                appElementName="root"   
                instruments={[0,1227]} 
                />
            </div> 
    );
  }
}

export default MidiHandler;

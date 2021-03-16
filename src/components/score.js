import React from "react"
import vocalNotes from './vocalNotesList.json';


class Score extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sung: this.props.freqBeingSung,
            correct: this.props.noteToBeSung
        };
    }
    componentDidMount(){
        this.setState({
            sung: this.props.freqBeingSung,
            correct: this.props.noteToBeSung
        })
    }
    getScore (sung, correct) {
        const correctNotefreqs = vocalNotes.map((note)=>{
            if(note.midiId%12===correct%12)
            {
                console.log(note.freq,note.midiId)
                return note.freq                
            }
            return 0
        })
        let i;
        let diff;
        let correctNoteIndex;
        console.log(correct)
        for(i=0;i<correctNotefreqs.length;i++)
        {
            if(correctNotefreqs[i])
            {
                console.log(Math.abs(correctNotefreqs[i]-sung))
                if(!diff)
                {
                    diff = Math.abs(correctNotefreqs[i]-sung)
                    let cor = correctNotefreqs[i]
                    correctNoteIndex = vocalNotes.findIndex(
                        (vocalNote) => vocalNote.freq === cor)
                }
                else if(Math.abs(correctNotefreqs[i]-sung) < diff)
                {
                    diff = Math.abs(correctNotefreqs[i]-sung)
                    let cor = correctNotefreqs[i]
                    correctNoteIndex = vocalNotes.findIndex(
                        (vocalNote) => vocalNote.freq === cor)
                }  
                console.log(correctNoteIndex,sung,vocalNotes[correctNoteIndex].freq)             
            }
            
        }        
        let range;
        let minFreq;
        let maxFreq;
        let result;
        
        if (sung === null || correct === null) {
            console.log("null")
            return 0
        }
    
        if (sung === vocalNotes[correctNoteIndex].freq) {
            return 100;
        } 
        else if (sung >= vocalNotes[correctNoteIndex - 1].freq && sung < vocalNotes[correctNoteIndex].freq) {
            minFreq = vocalNotes[correctNoteIndex - 1].freq;
            maxFreq = vocalNotes[correctNoteIndex].freq;
        } else if (sung > vocalNotes[correctNoteIndex].freq && typeof vocalNotes[correctNoteIndex + 1] === undefined) {
            // ideal number above the last vocal note
            minFreq = 2000;
            maxFreq = vocalNotes[correctNoteIndex].freq;
        } else if (sung > vocalNotes[correctNoteIndex].freq && sung <= vocalNotes[correctNoteIndex + 1].freq) {
             minFreq = vocalNotes[correctNoteIndex + 1].freq;
             maxFreq = vocalNotes[correctNoteIndex].freq;
             
         } else {
            console.log("else")
            return 0;
        }
        range = maxFreq- minFreq;
        result = +((((sung - minFreq) * 100) / range).toFixed(2));
        console.log(result)
        return result;
    }
    render() {
        return(
            <div></div>
        )
    }
}
export default Score;
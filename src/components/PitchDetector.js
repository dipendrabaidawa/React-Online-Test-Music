import React from "react";
import "./../App.css";
import vocalNotes from "./vocalNotesList.json";
import Wad from "web-audio-daw";

class PitchDetector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null,
      isRecording: false, //holds audio input data
      blobURL: "", //holds mpe file
      isBlocked: false,
      frequency: 0,
      noteIndex: -1,
      piches: [],
      /*
       * ? True => Stop Recording
       * ? False => Keep Recording Pitch
       */
      stopRecording: false,
    };
    this.getAudio = this.getAudio.bind(this);
  }
  clearpitches() {
    this.setState(
      {
        piches: [],
      },
      () => console.log(this.state.piches)
    );
  }
  getCurrent() {
    if (this.state.piches.length === 0) {
      return null;
    }
    var sum = 0;
    var i = 0;
    var len = 0;
    for (i = 0; i < this.state.piches.length; i++) {
      if (this.state.piches[i] > 0) {
        len = len + 1;
        sum += this.state.piches[i];
      }
    }
    console.log(sum,len)
    sum = sum / len;
    var note = 0;
    var diff;
    for (let i = 0; i < vocalNotes.length; i++) {
      if (!diff) {
        diff = Math.abs(vocalNotes[i].freq - sum);
        note = i;
      } else if (diff > Math.abs(vocalNotes[i].freq - sum)) {
        diff = Math.abs(vocalNotes[i].freq - sum);
        note = i;
      }
    }
    console.log(sum);
    return [sum,vocalNotes[note].midiId];
  }

  //function gets input from mic
  start = async () => {
    navigator.getUserMedia(
      {
        audio: true,
      },
      () => {
        console.log("Permission Granted");
        this.setState(
          {
            isBlocked: false,
            stopRecording: false,
          },
          () => console.log(this.state.isBlocked)
        );
      },
      () => {
        console.log("Permission Denied");
        this.setState(
          {
            isBlocked: true,
            stopRecording: false,
          },
          () => console.log(this.state.isBlocked)
        );
      }
    );

    this.myInterval = setInterval(() => {
      this.setState((prevState) => ({
        count: prevState.count + 1,
      }));
    }, 1000);

    if (this.state.isBlocked) {
      console.log("Permission Denied");
    } else {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      this.setState(
        {
          audio,
        },
        () => {
          this.getAudio();
        }
      );
    }
  };

  //stops audio input and sets an URL for download
  stop = () => {
    if (this.state.audio) {
      this.state.audio.getTracks().forEach((track) => track.stop());
      console.log(this.state.pitches);
      this.setState(
        {
          audio: null,
          stopRecording: true,
        },
        () => {
          console.log(this.state);
        }
      );
    }
    clearInterval(this.myInterval)
    setTimeout(() => {
      this.setState({
        piches: [],
      });
    }, 1000);
  };

  //displays message on console if there is an error
  componentDidMount() {}

  updateFreq(freq) {
    if (freq) {
      console.log(freq);
      for (let i = 0; i <= vocalNotes.length; i++) {
        if (i === vocalNotes.length) {
          this.setState({
            frequency: freq,
            noteIndex: vocalNotes.length - 1,
          });
        } else if (vocalNotes[i].freq > freq) {
          this.setState({ frequency: freq, noteIndex: i - 1 });
          break;
        }
        var temp = this.state.piches;
        temp.push(freq);
        this.setState({ piches: temp });
      }
    } else {
      this.setState({ frequency: 0, noteIndex: -1 });
      console.log("No pitch detected");
    }
  }

  getAudio() {
    let wait = 10;

    if (!window.voice) {
      window.voice = new Wad({ source: "mic" });
      window.tuner = new Wad.Poly();
      window.tuner.setVolume(0);
      window.tuner.add(window.voice);
      window.voice.play();
      window.tuner.updatePitch();
    }

    let logPitch = () => {
      if (window.tuner.pitch) {
        this.updateFreq(window.tuner.pitch);
      }
      if (!this.state.stopRecording) {
        setTimeout(() => {
          logPitch();
        }, wait);
      } else {
        try {
          window.tuner.stopUpdatingPitch();
          window.voice.stop();
          window.tuner.stop();
        } catch (e) {
          console.log(e);
        }
      }
    };
    logPitch();
  }

  render() {
    return <div></div>;
    
  }
}

export default PitchDetector;


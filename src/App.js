import { useEffect, useRef, useState } from "react";

import "./App.css";
import SynthOptions from "./components/SynthOptions";
import MIDI from "./components/MIDI";

import { createFreqTable } from "./utils";

function App() {
  var AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContext();
  const gain = audioCtx.createGain();
  const filter = audioCtx.createBiquadFilter();
  gain.connect(filter);
  filter.connect(audioCtx.destination);

  const notes = useRef({});

  const [rootKey, setRootKey] = useState(60);

  const [rootFreq, setRootFreq] = useState("261.63");

  // Note Ratios
  const [sa, setSa] = useState("1/1");
  const [komalRe, setKomalRe] = useState("16/15");
  const [re, setRe] = useState("9/8");
  const [komalGa, setKomalGa] = useState("6/5");
  const [ga, setGa] = useState("5/4");
  const [ma, setMa] = useState("4/3");
  const [tivraMa, setTivraMa] = useState("45/32");
  const [pa, setPa] = useState("3/2");
  const [komalDha, setKomalDha] = useState("8/5");
  const [dha, setDha] = useState("5/3");
  const [komalNi, setKomalNi] = useState("9/5");
  const [ni, setNi] = useState("15/8");

  // Frequency Table
  const table = useRef({});

  useEffect(() => {
    let newTable = createFreqTable(
      rootKey,
      [
        sa,
        komalRe,
        re,
        komalGa,
        ga,
        ma,
        tivraMa,
        pa,
        komalDha,
        dha,
        komalNi,
        ni,
      ],
      rootFreq
    );
    table.current = newTable;
  }, [
    sa,
    komalRe,
    re,
    komalGa,
    ga,
    ma,
    tivraMa,
    pa,
    komalDha,
    dha,
    komalNi,
    ni,
    rootKey,
    rootFreq,
  ]);

  const onClick = () => {
    console.log("notes: ", notes.current);
  };

  const changeKey = (e) => {
    setRootKey(e.target.value);
  };

  const changeRatio = (e, setter) => {
    setter(e.target.value);
  };

  function addNote(note, velocity) {
    // here we need to reference out freq map stored in parent component
    // parseNoteValues(note, rootKey, scale, rootFreq);
    const osc = audioCtx.createOscillator();
    // pass the frequency from the table into here
    console.log("TABLE.current", table.current);
    osc.frequency.setValueAtTime(table.current[note], audioCtx.currentTime);
    osc.type = "sawtooth";
    notes.current[note] = osc;
    notes.current[note].connect(gain);
    notes.current[note].start();
  }

  function removeNote(note) {
    notes.current[note].stop();
    delete notes.current[note];
  }

  function getMIDIMessage(midiMessage) {
    const command = midiMessage.data[0];
    const note = midiMessage.data[1];
    const velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
    // console.log("command: ", command);
    // console.log("note: ", note);
    // console.log("veloctiy: ", velocity);
    if (command === 144) {
      addNote(note, velocity);
    }
    if (command === 128) {
      removeNote(note);
    }
  }

  useEffect(() => {
    navigator.requestMIDIAccess().then(function (access) {
      // Get lists of available MIDI controllers
      const inputs = access.inputs.values();
      const outputs = access.outputs.values();

      for (let input of inputs) {
        input.onmidimessage = getMIDIMessage;
      }

      for (let output of outputs) {
        output.onmidimessage = getMIDIMessage;
      }

      access.onstatechange = function (e) {
        // Print information about the (dis)connected MIDI controller
        console.log(e.port.name, e.port.manufacturer, e.port.state);
      };
    });
  }, []);

  return (
    <div className="App">
      <button onClick={onClick}>Log out Notes Object</button>
      {/* <MIDI
        notes={notes}
        audioCtx={audioCtx}
        gain={gain}
        rootKey={rootKey}
        rootFreq={rootFreq}
        scale={[
          sa,
          komalRe,
          re,
          komalGa,
          ga,
          ma,
          tivraMa,
          pa,
          komalDha,
          dha,
          komalNi,
          ni,
        ]}
        table={table}
      /> */}

      <div className="freq-table">
        <div className="root-info">
          <label>Root Freq:</label>
          <input
            type="text"
            placeholder="261.63"
            onChange={(e) => setRootFreq(e.target.value)}
          />
          <label>Root Key:</label>
          <select className="root-note" onChange={changeKey}>
            <option value="60">C</option>
            <option value="61">C# / Db</option>
            <option value="62">D</option>
            <option value="63">D# / Eb</option>
            <option value="64">E</option>
            <option value="65">F</option>
            <option value="66">F# / Gb</option>
            <option value="67">G</option>
            <option value="68">G# / Ab</option>
            <option value="69">A</option>
            <option value="70">A# / Bb</option>
            <option value="71">B</option>
          </select>
        </div>
        <div className="note-ratios">
          <label>Note Ratios:</label>
          <span>Sa</span>
          <select onChange={(e) => changeRatio(e, setKomalRe)}>
            <option value="256/243">Ati Komal Re</option>
            <option value="16/15">Komal Re</option>
          </select>
          <select onChange={(e) => changeRatio(e, setRe)}>
            <option value="10/9">Shuddha Re</option>
            <option value="9/8">Tivra Re</option>
          </select>
          <select onChange={(e) => changeRatio(e, setKomalGa)}>
            <option value="32/27">Ati Komal Ga</option>
            <option value="6/5">Komal Ga</option>
          </select>
          <select onChange={(e) => changeRatio(e, setGa)}>
            <option value="5/4">Shuddha Ga</option>
            <option value="81/64">Tivra Ga</option>
          </select>
          <select onChange={(e) => changeRatio(e, setMa)}>
            <option value="4/3">Shuddha Ma</option>
            <option value="27/20">Shruti Ma</option>
          </select>
          <select onChange={(e) => changeRatio(e, setTivraMa)}>
            <option value="45/32">Tivra Ma</option>
            <option value="729/512">Tivra Tivra Ma</option>
          </select>
          <span>Pa</span>
          <select onChange={(e) => changeRatio(e, setKomalDha)}>
            <option value="128/81">Ati Komal Dha</option>
            <option value="8/5">Komal Dha</option>
          </select>
          <select onChange={(e) => changeRatio(e, setDha)}>
            <option value="5/3">Shuddha Dha</option>
            <option value="27/16">Tivra Dha</option>
          </select>
          <select onChange={(e) => changeRatio(e, setKomalNi)}>
            <option value="16/9">Ati Komal Ni</option>
            <option value="9/5">Komal Ni</option>
          </select>
          <select onChange={(e) => changeRatio(e, setNi)}>
            <option value="15/8">Shuddha Ni</option>
            <option value="243/128">Tivra Ni</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default App;

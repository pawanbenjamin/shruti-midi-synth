import React, { useEffect } from "react";
import { parseNoteValues } from "../utils";

function MIDI({ notes, audioCtx, gain, table }) {
  function addNote(note, velocity) {
    // here we need to reference out freq map stored in parent component
    // parseNoteValues(note, rootKey, scale, rootFreq);
    const osc = audioCtx.createOscillator();
    // pass the frequency from the table into here
    const noteFreq = table[note];
    osc.frequency.setValueAtTime(noteFreq, audioCtx.currentTime);
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
    console.log("command: ", command);
    console.log("note: ", note);
    console.log("veloctiy: ", velocity);
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
  return null;
}

export default MIDI;

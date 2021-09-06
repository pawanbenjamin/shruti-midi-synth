import React, { useEffect } from "react";

function MIDI({ notes }) {
  function addNote(note, velocity) {
    notes.current.push({ note, velocity });
  }

  function removeNote(note) {
    notes.current.forEach((n, i) => {
      if (n.note === note) {
        notes.current.splice(i, 1);
      }
    });
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

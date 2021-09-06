import React, { useEffect } from "react";
import { parseNoteValues } from "../utils";

function MIDI({ notes, audioCtx, gain, rootKey, rootFreq, scale }) {
  //   function parseNoteValues(note, rootKey, scale, rootFreq) {
  //     //if root key is 58 (D)
  //     //the frequency for 58:rootFreq
  //     //createFrequency Table to use for note generation
  //     let copy = rootKey;
  //     let scaleDegree = 0;
  //     let oct = 1;
  //     let idx = 0 % 12;
  //     const freqTable = {
  //       rootKey: rootFreq,
  //     };
  //     while (copy < 128) {
  //       let ratio = scale[scaleDegree % 12];
  //       let [numer, denom] = ratio.split("/");
  //       numer = parseInt(numer);
  //       denom = parseInt(denom);
  //       console.log({
  //         numer,
  //         denom,
  //       });
  //       //   const [numerator, denominator] = scale[scaleDegree % 11].split("/");
  //       //   freqTable[copy] = (rootFreq * +numerator) / +denominator;
  //       copy++;
  //       scaleDegree++;
  //       idx++;
  //       if (idx === 0) {
  //         oct++;
  //       }
  //     }
  //     let copy2 = rootFreq;
  //     let scaleDeg2 = 0;
  //     let idx2 = 0 % 12;
  //     while (copy2 >= 0) {
  //       let ratio = scale[scaleDeg2 % 12];
  //       let [numer, denom] = ratio.split("/");
  //       numer = parseInt(numer);
  //       denom = parseInt(denom);
  //       console.log({
  //         numer,
  //         denom,
  //       });
  //       //   const [numerator, denominator] = scale[scaleDegree % 11].split("/");
  //       //   freqTable[copy] = (rootFreq * +numerator) / +denominator;
  //       copy2--;
  //       scaleDeg2--;
  //       idx--;
  //       if (idx === 0) {
  //         oct--;
  //       }
  //     }
  //     console.log(scale);
  //   }

  function addNote(note, velocity) {
    // here we need to reference out freq map stored in parent component
    // parseNoteValues(note, rootKey, scale, rootFreq);
    const osc = audioCtx.createOscillator();
    osc.frequency.setValueAtTime(440.0, audioCtx.currentTime);
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

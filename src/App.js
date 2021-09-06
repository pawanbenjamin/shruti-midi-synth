import { useEffect, useRef } from "react";

import "./App.css";
import MIDI from "./components/MIDI";

function App() {
  var AudioContext = window.AudioContext || window.webkitAudioContext;

  const audioCtx = new AudioContext();

  const notes = useRef({});

  const onClick = () => {
    console.log("notes: ", notes.current);
  };

  return (
    <div className="App">
      <button onClick={onClick}></button>
      <MIDI notes={notes} audioCtx={audioCtx} />
    </div>
  );
}

export default App;

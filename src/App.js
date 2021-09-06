import { useEffect, useRef } from "react";

import "./App.css";
import MIDI from "./components/MIDI";

function App() {
  const notes = useRef([]);

  const onClick = () => {
    console.log("notes: ", notes);
  };

  return (
    <div className="App">
      <button onClick={onClick}></button>
      <MIDI notes={notes} />
    </div>
  );
}

export default App;

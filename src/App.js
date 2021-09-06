import { useEffect, useRef, useState } from "react";

import "./App.css";
import FreqTable from "./components/FreqTable";
import MIDI from "./components/MIDI";

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

  const onClick = () => {
    console.log("notes: ", notes.current);
  };

  return (
    <div className="App">
      <button onClick={onClick}>Log out Notes Object</button>
      <MIDI
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
      />
      <FreqTable
        setRootKey={setRootKey}
        setRootFreq={setRootFreq}
        setSa={setSa}
        setKomalRe={setKomalRe}
        setRe={setRe}
        setKomalGa={setKomalGa}
        setGa={setGa}
        setMa={setMa}
        setTivraMa={setTivraMa}
        setPa={setPa}
        setKomalDha={setKomalDha}
        setDha={setDha}
        setKomalNi={setKomalNi}
        setNi={setNi}
      />
    </div>
  );
}

export default App;

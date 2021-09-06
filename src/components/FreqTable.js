import React from "react";

function FreqTable({
  setRootFreq,
  setRootKey,
  setSa,
  setKomalRe,
  setRe,
  setKomalGa,
  setGa,
  setMa,
  setTivraMa,
  setPa,
  setKomalDha,
  setDha,
  setKomalNi,
  setNi,
}) {
  const changeKey = (e) => {
    setRootKey(e.target.value);
  };

  const changeRatio = (e, setter) => {
    setter(e.target.value);
  };
  return (
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
  );
}

export default FreqTable;

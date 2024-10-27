"use client";

import { useState, useCallback, useEffect , useRef} from "react";

export default function Home() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const passwordRef = useRef(null)


  const passwordGen = useCallback(() => {
    let returnable= "";
    let strings = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    const numbers = "1234567890";
    const characters = "!@#$%&*";

    if (character) strings += characters;
    if (number) strings += numbers;

    for (let i = 1; i <= length; i++) {
      const random = Math.floor(Math.random() * strings.length);
      returnable += strings[random];
    }

    setPassword(returnable);
  }, [length, number, character]);


  useEffect(() => {
    passwordGen();
  }, [passwordGen,length, number, character]);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password)
  }

  return (
    <>
      <div className="flex flex-col w-auto justify-center items-center gap-3 p-10 ">
        <h1>Password Generator</h1>
        <div className="flex gap-3">
          <input
            className="text-black"
            type="text"
            name="password"
            id="password"
            value={password}
            readOnly
            ref={passwordRef}
          />
          <button onClick={copyPassword}>copy</button>
        </div>
        <div className="flex gap-3">
          <label>
            <input
              type="range"
              name="length"
              id="length"
              min={6}
              max={20}
              value={length}
              onChange={(e) => {
                setLength(parseFloat(e.target.value));
              }}
            />
            length ({length})
          </label>
          <label>
            numbers
            <input
              type="checkbox"
              name="number"
              id="number"
              defaultChecked={number}
              onChange={() => setNumber((previous)=> !previous)}
            />
          </label>
          <label>
            characters
            <input
              type="checkbox"
              name="character"
              id="character"
              defaultChecked={character}
              onChange={() => setCharacter((previous)=> !previous)}
            />
          </label>
        </div>
      </div>
    </>
  );
}

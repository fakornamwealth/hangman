import "./App.css";
import { useState, useEffect } from "react";

function Character({ char, state }) {
  return <span className="letter">{state ? char : "_"}</span>;
}

const getWord = async function () {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  return response.json();
};

function reset() {
  window.location.reload();
}

function App() {
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [charStates, setCharStates] = useState([]);
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);
  const [letters, setLetters] = useState([
    { letter: "a", tried: false },
    { letter: "b", tried: false },
    { letter: "c", tried: false },
    { letter: "d", tried: false },
    { letter: "e", tried: false },
    { letter: "f", tried: false },
    { letter: "g", tried: false },
    { letter: "h", tried: false },
    { letter: "i", tried: false },
    { letter: "j", tried: false },
    { letter: "k", tried: false },
    { letter: "l", tried: false },
    { letter: "m", tried: false },
    { letter: "n", tried: false },
    { letter: "o", tried: false },
    { letter: "p", tried: false },
    { letter: "q", tried: false },
    { letter: "r", tried: false },
    { letter: "s", tried: false },
    { letter: "t", tried: false },
    { letter: "u", tried: false },
    { letter: "v", tried: false },
    { letter: "w", tried: false },
    { letter: "x", tried: false },
    { letter: "y", tried: false },
    { letter: "z", tried: false },
  ]);

  function checkOption(char) {
    if (wrong < 8) {
      let tried = letters
        .map(function (letter) {
          //console.log(letter);
          return letter.letter;
        })
        .indexOf(char);
      if (letters[tried].tried == false) {
        let foundMatch = false;
        setLetters(function (prev) {
          const newLetters = prev.map(function (item, index) {
            if (index == tried) {
              item.tried = true;
            }
            return item;
          });
          return newLetters;
        });
        for (let i = 0; i < charStates.length; i++) {
          if (charStates[i].char == char) {
            foundMatch = true;
            setCharStates(function (prev) {
              const newCharStates = prev.map(function (item, index) {
                if (index == i) {
                  return { ...item, state: true };
                }
                return item;
              });
              return newCharStates;
            });
          }
        }
        if (foundMatch) {
          setCorrect(correct + 1);
          console.log(charStates);
          let left = 0;
          charStates.filter(function (char) {
            if (char.state == false) {
              left = left + 1;
            }
          });
          console.log(left);
          if (left < 2) {
            setWin(true);
          }
        } else {
          setWrong(wrong + 1);
        }
      } else {
        console.log("already tried this letter");
      }
    } else {
      console.log("you lose");
      setLose(true);
    }
  }

  useEffect(function () {
    getWord().then(function (json) {
      const word = json[0];
      console.log(word);
      const states = [];
      for (let i = 0; i < word.length; i++) {
        states.push({
          char: word[i],
          state: false,
        });
      }
      setCharStates(states);
    });
  }, []);

  return (
    <div className="App">
      <h1>Hangman</h1>
      {charStates.map(function (char, index) {
        return <Character key={index} char={char.char} state={char.state} />;
      })}
      <h2>Correct: {correct}</h2>
      <h2>Wrong: {wrong}</h2>
      <div id="letters">
        {letters.map(function (letter, index) {
          return (
            <button
              key={index}
              onClick={function () {
                checkOption(letter.letter);
              }}
              className={letter.tried ? "tried" : ""}
            >
              {letter.letter}
            </button>
          );
        })}
      </div>
      <p>
        <a href="#" onClick={reset}>
          Restart
        </a>
      </p>
      {win ? <h1>WIN</h1> : ""}
      {lose ? <h1>LOSE</h1> : ""}
    </div>
  );
}

export default App;

// Import dependencies
import "./App.css";
import { useState, useEffect } from "react";
import Rules from "./components/Rules";
import Character from "./components/Character";
import Result from "./components/Result";
import Guesses from "./components/Guesses";

// Function to fetch a random word from an external API
const getWord = async function () {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  return response.json();
};

// Function to show the game rules
function rules() {
  let display = document.getElementById("rules").style.display;
  let newDisplay = display == "block" ? "none" : "block";
  document.getElementById("rules").style.display = newDisplay;
}

// Function to reset the game state
function reset() {
  window.location.reload();
}

// Function to display a help message
function help() {
  let display = document.getElementById("help").style.display;
  let newDisplay = display == "block" ? "none" : "block";
  document.getElementById("help").style.display = newDisplay;
}

// Main component
function App() {
  // Define game state variables
  const [correct, setCorrect] = useState(0); // Variable to hold number of correct guesses so far
  const [wrong, setWrong] = useState(0); // Variable to hold number of wrong guesses so far
  const [charStates, setCharStates] = useState([]); // Array to hold the state of each letter in the word to be guessed
  const [win, setWin] = useState(false); // Boolean to set the win state of the game
  const [lose, setLose] = useState(false); // Boolean to set the lose state of the game
  const [letters, setLetters] = useState([
    // Array with objects for each letter in the alphabet
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

  // This function runs each time the player clicks on a letter
  function checkOption(char) {
    if (wrong < 8) {
      // If the player has less than 8 wrong attempts, proceed...
      // Get the currently clicked letter
      // By selecting it with the index of the char parameter
      let tried = letters
        .map(function (letter) {
          //console.log(letter);
          return letter.letter;
        })
        .indexOf(char);

      // Check if the currently selected letter has not been tried previously
      if (letters[tried].tried == false) {
        // Update tried state of letters in the letters state array
        setLetters(function (prev) {
          const newLetters = prev.map(function (item, index) {
            if (index == tried) {
              item.tried = true;
            }
            return item;
          });
          return newLetters;
        });

        // Search for matches to the letter on the word
        // First we create a control variable and set it to false
        // This will be set to true as soon as we find a match on the word
        let foundMatch = false;

        // Iterate over letter in the word looking for matches
        for (let i = 0; i < charStates.length; i++) {
          if (charStates[i].char == char) {
            foundMatch = true; // If we find a match, we set foundMatch to true
            // Update charStates
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

        // If a match was found we increase the count of correct gueses
        if (foundMatch) {
          setCorrect(correct + 1);
          console.log(charStates);
          let left = 0; // Count how many letters are left to try
          charStates.filter(function (char) {
            if (char.state == false) {
              left = left + 1;
            }
          });
          console.log(left);
          if (left < 2) {
            setWin(true); // If there's no more letters to guess, we set the win state to true
          }
        } else {
          setWrong(wrong + 1); // Increase amount of wrong guesses if no match is found
        }
      } else {
        console.log("already tried this letter");
      }
    } else {
      console.log("you lose");
      setLose(true); // If there's no more letters to try, we set the lose state to true
    }
  }

  useEffect(function () {
    // Call getWord function to get random word from external API
    getWord().then(function (json) {
      const word = json[0];
      console.log(word);
      const states = [];
      // Itarate over the letters of the new word, setting each letter to false, to hide them at first
      for (let i = 0; i < word.length; i++) {
        states.push({
          char: word[i],
          state: false,
        });
      }
      setCharStates(states); // udpate the state variable for the word's letters
    });
  }, []);

  return (
    <div className="App">
      <h1>Hangman</h1>
      {/* Use .map() function to iterate over each letter in the word to be guessed */}
      {/* Render one Character component with properties, for each letter in teh word */}
      {charStates.map(function (char, index) {
        return <Character key={index} char={char.char} state={char.state} />;
      })}

      <Guesses data={{ correct, wrong }} />

      <div id="letters">
        {/* Iterate over all letters in the alphabet to show game controls to the player */}
        {letters.map(function (letter, index) {
          return (
            <button
              key={index}
              onClick={function () {
                checkOption(letter.letter); // call checkOption funciton when the player clicks on a letter
              }}
              className={letter.tried ? "tried" : ""}
            >
              {letter.letter}
            </button>
          );
        })}
      </div>
      {/* Show additional game options */}
      <p>
        <a href="#" onClick={rules}>
          How to play
        </a>{" "}
        <a href="#" onClick={reset}>
          Restart
        </a>{" "}
        <a href="#" onClick={help}>
          Help
        </a>
      </p>
      {/* Show game state after winning or losing */}
      <Result state={{ win, lose }} />
      <Rules />
    </div>
  );
}

export default App;

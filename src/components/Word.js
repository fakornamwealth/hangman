import { useEffect } from "react";
import Character from "../components/Character";

// Function to fetch a random word from an external API
const getWord = async function () {
  const response = await fetch("https://random-word-api.herokuapp.com/word");
  return response.json();
};

function Word({ charStates, setCharStates }) {
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
    <div id="word">
      {/* Use .map() function to iterate over each letter in the word to be guessed */}
      {/* Render one Character component with properties, for each letter in teh word */}
      {charStates.map(function (char, index) {
        return <Character key={index} char={char.char} state={char.state} />;
      })}
    </div>
  );
}
export default Word;

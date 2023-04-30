function Letters({ letters, checkOption }) {
  return (
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
  );
}
export default Letters;

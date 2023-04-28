function Guesses({ data }) {
  return (
    <div id="guesses">
      {/* Display guesses information */}
      <h2>Correct: {data.correct}</h2>
      <h2>Wrong: {data.wrong}</h2>
    </div>
  );
}
export default Guesses;

function Result({ state }) {
  return (
    <div id="result">
      {state.win ? <h1>WIN</h1> : ""}
      {state.lose ? <h1>LOSE</h1> : ""}
    </div>
  );
}
export default Result;

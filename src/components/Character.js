// Define funciton component to display a single letter from the alphabet
function Character({ char, state }) {
  return <span className="letter">{state ? char : "_"}</span>;
}
export default Character;

import {useState} from "react";

export const RED = 'MediumVioletRed'
export const BLUE = 'MidnightBlue'

export const replaceCamelCaseWithSpaces = (colorName) => {
    // replace any capital letter found in the middle of a word with the same letter preceded by a space
    return colorName.replace(/\B([A-Z])\B/g, " $1")

}
function App() {
    const [color, setColor] = useState(RED);
    const [disabled, setDisabled] = useState(false);
    const newButtonColor = color === RED ? BLUE : RED;
    const handleClick = () => setColor(newButtonColor)
    const handleCheck = () => setDisabled(!disabled)

  return (
    <div>
        <button style={{backgroundColor: disabled ? 'gray' :  color}} onClick={handleClick} disabled={disabled}>
            Change to {replaceCamelCaseWithSpaces(newButtonColor)}
        </button>
        <label>
            <input type={'checkbox'} checked={disabled} onChange={handleCheck} />
            Disable button
        </label>
    </div>
  );
}

export default App;

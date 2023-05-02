import { useState } from "react";
import "./styles.css";

// FIX ROUNDING ERROR

export default function App() {
  const [displayValue, setDisplayValue] = useState(null);
  const [currentOperator, setCurrentOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const buttons = [
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
    "/"
  ];

  const calculate = (operator, num1, num2) => {
    if (operator === "*") {
      return num1 * num2;
    } else if (operator === "/") {
      return num1 / num2;
    } else if (operator === "+") {
      return num1 + num2;
    } else if (operator === "-") {
      return num1 - num2;
    }
    return undefined;
  };

  const handleClick = (letter) => {
    if (letter === "*" || letter === "/" || letter === "+" || letter === "-") {
      if (currentOperator === null) {
        setCurrentOperator(letter);
        if (displayValue !== null) setPrevValue("" + +displayValue);
        else if (displayValue === null && prevValue === null) setPrevValue("0");
        setDisplayValue(null);
      } else if (prevValue !== null && displayValue !== null) {
        const result = calculate(currentOperator, +prevValue, +displayValue);
        setPrevValue("" + result);
        setDisplayValue(null);
        setCurrentOperator(letter);
      } else if (prevValue !== null) {
        setCurrentOperator(letter);
      }
    } else if (letter === "=") {
      const result = calculate(currentOperator, +prevValue, +displayValue);
      if (result !== undefined) {
        setPrevValue("" + result);
        setDisplayValue(null);
      }
      setCurrentOperator(null);
    } else if (letter === "<-") {
      if (displayValue) {
        const displayValueArr = displayValue.split("");
        displayValueArr.pop();
        displayValueArr.length !== 0
          ? setDisplayValue(displayValueArr.join(""))
          : setDisplayValue("0");
      }
    } else if (letter === "C") {
      if (currentOperator === null) {
        setPrevValue(null);
        setCurrentOperator(null);
        setDisplayValue(null);
      } else setDisplayValue("0");
    } else if (letter === "AC") {
      setPrevValue(null);
      setCurrentOperator(null);
      setDisplayValue(null);
    } else if (letter === ".") {
      if (displayValue === null && currentOperator === null) setPrevValue(null);
      if (displayValue && !displayValue.split("").includes(".")) {
        setDisplayValue("" + displayValue + letter);
      } else if (displayValue === null) {
        setDisplayValue("0.");
      }
    } else {
      if (displayValue === null && currentOperator === null) setPrevValue(null);
      displayValue !== null && displayValue !== "0"
        ? setDisplayValue("" + displayValue + letter)
        : setDisplayValue("" + letter);
    }
  };
  return (
    <div className="App">
      <div className="screen">
        <span className={"expression"}>
          {`${prevValue ? prevValue : ""} 
          ${currentOperator ? currentOperator : ""}
          `}
        </span>
        <span className={"display-value"}>
          {displayValue !== null
            ? displayValue
            : prevValue !== null
            ? prevValue
            : "0"}
        </span>
      </div>
      <div className="keypad">
        <button className={"button--long"} onClick={() => handleClick("AC")}>
          {"AC"}
        </button>
        <button onClick={() => handleClick("C")}>{"C"}</button>
        <button onClick={() => handleClick("<-")}>{"<-"}</button>
      </div>
      <div className="keypad">
        {buttons.map((letter) => (
          <button key={letter} onClick={() => handleClick(letter)}>
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

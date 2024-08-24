import React from "react";
import Display from "./Display";

const Calculator = ({
  buttons,
  handleResult,
  Allclear,
  deleteOne,
  result,
  figure,
  calculateValue,
}) => {
  return (
    <div>
      <div className="calculator">
        <Display figure={figure} result={result} />
        <div className="container">
          <div className="values-wrapper">
            <button
              className="result num-btn"
              onClick={handleResult}
              data="="
            ></button>
            <button
              className="clear num-btn"
              onClick={Allclear}
              data="AC"
            ></button>
            <button
              className="del num-btn"
              data="Del"
              onClick={deleteOne}
            ></button>
            {buttons.map((index) => (
              <button
                key={index}
                onClick={() => {
                  calculateValue(index.toString());
                }}
                className={`btn${buttons.indexOf(index)} num-btn`}
                style={{ "--color": buttons.indexOf(index) }}
                data={index}
              >
                {/* {index} */}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;

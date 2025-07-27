import React from "react";
import { Button } from "react-bootstrap";

const OptionContainer = ({ question, selectedOption, setSelectedOption, setCorrectOption }) => {
  const options = question.options;

  function selectAnswer(index, option) {
    setSelectedOption(index);
    if (option.is_correct === true) {
      setCorrectOption(index);
    }
  }

  return (
    <div className="d-flex flex-column gap-3">
      {options.map((option, index) => (
        <Button
          key={option.id}
          variant="light"
          className={`option-btn px-4 py-3 rounded-3 shadow-sm ${
            selectedOption === index ? "selected-option" : ""
          }`}
          onClick={() => selectAnswer(index, option)}
        >
          {option.option}
        </Button>
      ))}
    </div>
  );
};

export default OptionContainer;

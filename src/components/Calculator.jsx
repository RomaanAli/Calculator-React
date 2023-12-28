import React from 'react'
import Input from './Input'
import Keypad from './Keypad'
import Operands from './Operands'
import Operators from './Operators'
import '../App.css'


const Calculator = () => {
    const [inputValue, setInputValue] = React.useState('');
  const [expressionParts, setExpressionParts] = React.useState([]);

  const handleOperandClick = (value) => {
    if (value === 'AC') {
      setInputValue('');
      setExpressionParts([]);
    } else if (value === '%') {
      // Handle percentage operation
      handlePercentage();
    } else if (value === '+/-') {
      // Handle +/- operation
      handleToggleSign();
    } else {
      setInputValue((prevValue) => prevValue + value);
      setExpressionParts((prevParts) => [...prevParts, value]);
    }
  };
  const handleToggleSign = () => {
    const lastPartIndex = expressionParts.length - 1;
    if (lastPartIndex >= 0 && !isNaN(expressionParts[lastPartIndex])) {
      // Toggle the sign of the last number in the expression
      const lastPart = expressionParts[lastPartIndex];
      const toggledValue = lastPart.startsWith('-') ? lastPart.slice(1) : `-${lastPart}`;
      expressionParts[lastPartIndex] = toggledValue;
      setInputValue(expressionParts.join(''));
    } else {
      setInputValue('Error: Invalid +/-');
    }
  };
  

  const handleKeypadClick = (value) => {
    setInputValue((prevValue) => prevValue + value);
    setExpressionParts((prevParts) => [...prevParts, value]);
  };

  const handleOperatorClick = (value) => {
    if (value === '=') {
      // Perform the calculation when '=' is clicked
      calculateResult();
    } else {
      // Check for consecutive operators
      const lastPart = expressionParts[expressionParts.length - 1];
      if (!isOperator(lastPart)) {
        // Record the entire expression when an operator is clicked
        setExpressionParts((prevParts) => [...prevParts, value]);
        setInputValue((prevValue) => prevValue + value);
      }
      else if ((lastPart === '-' || lastPart==='+') && (value === '-' || value === '+')) {
        // Replace the last operator with the new operator
        const newParts = [...expressionParts];
        newParts.pop();
        newParts.push(value);
        setExpressionParts(newParts);
        setInputValue((prevValue) => prevValue.slice(0, -1) + value);
      }
      else if ((lastPart === '*' || lastPart==='/') && (value === '*' || value === '/')) {
        // Replace the last operator with the new operator
        const newParts = [...expressionParts];
        newParts.pop();
        newParts.push(value);
        setExpressionParts(newParts);
        setInputValue((prevValue) => prevValue.slice(0, -1) + value);
      }
      else if ((lastPart === '*' || lastPart==='/') && (value === '-' || value === '+')) {
        //add operator to expression
        const newParts = [...expressionParts];
        newParts.push(value);
        setExpressionParts(newParts);
        setInputValue((prevValue) => prevValue + value);
      }
      else if ((lastPart === '-' || lastPart==='+') && (value === '*' || value === '/')) {
        //replace operator with new operator
        const newParts = [...expressionParts];
        newParts.pop();
        newParts.push(value);
        setExpressionParts(newParts);
        setInputValue((prevValue) => prevValue.slice(0, -1) + value);
      }

    }
  };

  const calculateResult = () => {
    try {
      const result = eval(expressionParts.join(''));
      setInputValue(result.toString());
      
      setExpressionParts([result.toString()]); // Set expressionParts to result for further calculations
    } catch (error) {
      setInputValue('Error');
      setExpressionParts([]);
    }
  };

  const handlePercentage = () => {
    // Handle percentage operation if there is a number before "%"
    const lastPartIndex = expressionParts.length - 1;
    if (lastPartIndex >= 0 && !isNaN(expressionParts[lastPartIndex])) {
      const lastPart = parseFloat(expressionParts.pop()) / 100;
      setInputValue(lastPart.toString());
      setExpressionParts([lastPart.toString()]);
    } else {
      setInputValue('Error: Invalid Percentage');
    }
  };

  // Helper function to check if a string is an operator
  const isOperator = (value) => {
    const operators = ['+', '-', '*', '/'];
    return operators.includes(value);
  };
  return (
    <div className='calc'>
    <Input value={inputValue} />
      <div className="obj">
        <div>
          <Operands onOperandClick={handleOperandClick} />
          <Keypad onKeypadClick={handleKeypadClick} />
        </div>
        <Operators onOperatorClick={handleOperatorClick} />
      </div>
    </div>
  )
}

export default Calculator
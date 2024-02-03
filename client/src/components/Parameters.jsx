import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import React, { useState, useRef } from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import TimerIcon from '@mui/icons-material/Timer';

export default function DiscreteSlider() {
  const [value, setValue] = React.useState(15);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (buttonIndex) => {
    setSelectedButton(buttonIndex);
  }
  function valuetext(value) {
    return `${value} mins`; // Custom function to format the value text
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">HOW MUCH TIME DO YOU HAVE?</h1>
      <div className="w-80 ml-2 order-2 text-right flex">
        <TimerIcon></TimerIcon>
        <Typography variant="body1"> {value} mins</Typography>
      </div>
      <div className="w-80  ">
        <Slider
          aria-label="Temperature"
          value={value}
          onChange={handleChange}
          getAriaValueText={valuetext}
          step={15}
          marks
          min={5}
          max={120}
        />
      </div>
      <div className="number-of-ppl">
      <h1 className="text-2xl font-bold mb-4">HOW MANY PEOPLE DO YOU HAVE TO SERVE?</h1>
      <div className="buttons flex items-center justify-between ">
     
        {[2, 4, 8].map((buttonValue) => (
          <Button
            key={buttonValue}
            style={{ color: selectedButton === buttonValue ? 'black' : 'inherit', border: selectedButton === buttonValue ? '1px solid black' : 'none',marginRight: buttonValue < 2 ? '8px' : '0',  }}
            onClick={() => handleButtonClick(buttonValue)}
          >
            {buttonValue} PEOPLE
          </Button>
        ))}
      </div>
        </div>
    </div>
  );
}

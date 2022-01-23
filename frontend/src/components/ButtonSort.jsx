import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function RowRadioButtonsGroup(props) {
  const handleRadioChange = (e) => {
    // e.preventDefault();
    console.log("props", props);
    props.setFilterSelected(e.target.value);
    console.log("VALUE", e.target.value)

    // if(props.valueRadio ) {
    //   const sortResult = props.state((project) => {
    //     return Object.values(project)
    //     .includes(props.valueRadio);
        
    //   });
    //   props.setRadioResults(sortResult);
    // } else {
    //   props.setRadioResults(props.state);
    // }

  }


  

  return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Filter Projects By:</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.filterSelected}
        onChange={handleRadioChange}
      >
        <FormControlLabel 
          value="All" 
          control={<Radio />} 
          label="All" />
        <FormControlLabel 
          value="Closed" 
          control={<Radio />} 
          label="Closed" />
        <FormControlLabel 
          value="Open" 
          control={<Radio />} 
          label="Open" />
        
      </RadioGroup>
    </FormControl>
  );
}

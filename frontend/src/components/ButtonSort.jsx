import * as React from 'react';
import Radio from '@mui/material/Radio';
import Typography from '@mui/material/Typography';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function RowRadioButtonsGroup(props) {
  const handleRadioChange = (e) => {
    props.setFilterSelected(e.target.value);
  }

  return (
    <FormControl>
      <Typography variant="caption" align="left" >
        Filter Projects By:
      </Typography>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.filterSelected}
        onChange={handleRadioChange}
      >
        <FormControlLabel
          value="All"
          control={<Radio sx={{
            color: "#009688",
            "&.Mui-checked": {
              color: "#009688",
            },
          }} />}
          label="All" />
        <FormControlLabel
          value="Closed"
          control={<Radio sx={{
            color: "#009688",
            "&.Mui-checked": {
              color: "#009688",
            },
          }} />}
          label="Closed" />
        <FormControlLabel
          value="Open"
          control={<Radio sx={{
            color: "#009688",
            "&.Mui-checked": {
              color: "#009688",
            },
          }} />}
          label="Open" />
      </RadioGroup>
    </FormControl>
  );
}

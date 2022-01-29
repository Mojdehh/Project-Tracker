import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelectChip(props) {
  const theme = useTheme();
  const [personName, setPersonName] = React.useState(props.arrOfDevs);

  const findIdByUserName = (name) => {
    const user = props.names.find((id) => id.full_name === name);
    return user.id;
  };

  const getIds = (arr) => {
    const idArr = [];
    for (let item of arr) {
      if (!idArr.includes(item)) {
        idArr.push(findIdByUserName(item));
      }
    }
    return idArr;
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      typeof value === "string" ? value.split(",") : value
    );
    props.setUsers(value);
    const ids = getIds(value);
    props.setUserId(ids);
  };

  const arrDevs = (arr) => {
    const newArr = [];
    for (let item of arr) {
      newArr.push(item.devs);
    }
    return newArr;
  };

  function sort(arr1, arr2) { }
  return (
    <div>
      <FormControl sx={{ m: 1, width: "50ch" }}>
        <InputLabel id="demo-multiple-chip-label">
          Edit Assigned Developers
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="select-multiple-chip"
              label="Edit Assigned Developers"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {props.names.map((name) => (
            <MenuItem
              key={name.id}
              id={name.id}
              value={name.full_name}
              style={getStyles(name, personName, theme)}
              onClick={(event) => {
                props.setUsers(event.target.id);
              }}
            >
              {name.full_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

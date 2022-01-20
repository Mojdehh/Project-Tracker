import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import axios from "axios";

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
  const [personName, setPersonName] = React.useState([]);
  const [names, setNames] = React.useState([]);

  React.useEffect(() => {
    return axios
      .get("http://localhost:8080/api/users")
      .then((users) => {
        console.log("users", users.data);
        setNames(users.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const arrDevs = (devs) => {
    const newArr = [];
    for (let item of devs) {
      newArr.push(item.devs);
    }
    return newArr;
  };

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
          value={arrDevs(props.devs)}
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
          {names.map((name) => (
            <MenuItem
              key={name.id}
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

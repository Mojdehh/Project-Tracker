import * as React from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
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

export default function UsersDropDown(props) {
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
      typeof value === "string" ? value.split(",") : value
    );
    props.setUsers(value);
    const newArr = names.find(
      (name) => name.full_name === value[value.length - 1]
    );
    props.setUserId(value);
  };

  const findUserNameById = (id) => {
    const user = names.find((name) => name.id === id);
    return user.full_name;
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "50ch" }}>
        <InputLabel id="demo-multiple-chip-label">{props.title}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={personName}
          onChange={handleChange}
          input={
            <OutlinedInput id="select-multiple-chip" label={props.title} />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={findUserNameById(value)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name.id}
              id={name.id}
              value={name.id}
              style={getStyles(name, personName, theme)}
              onClick={(event) => {
                props.setUsers(event.target.id);
              }}
            >
              {name.full_name}
            </MenuItem>
          ))}
        </Select>
        <section
          style={{
            marginLeft: "10px",
            color: "red",
          }}
        >
          {props.errorNoDevs}
        </section>
      </FormControl>
    </div>
  );
}
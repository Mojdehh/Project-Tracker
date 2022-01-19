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

// const names = [
//   "Oliver Hansen",
//   "Van Henry",
//   "April Tucker",
//   "Ralph Hubbard",
//   "Omar Alexander",
//   "Carlos Abbott",
//   "Miriam Wagner",
//   "Bradley Wilkerson",
//   "Virginia Andrews",
//   "Kelly Snyder",
// ];

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
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.setUsers(value);
    const newArr = names.find(
      (name) => name.full_name === value[value.length - 1]
    );
    props.setUserId(value);

    console.log("props.id", props.userId);
    console.log(newArr);
    console.log(value);
    // names.forEach((user) => {
    // if (props.id.length !== 0) {
    //   let newID = [...props.id, newArr];
    //   props.setId(newID);
    // } else {
    //   props.setId(newArr);
    // }
    // console.log(value);
    // if (!user) {
    //   setId(user);
    // } else if (user.full_name === value[0]) {
    //   console.log(value);
    //   setId(user);
    // }
    // console.log("user", user);
    // console.log("id", id);
    // });
  };
  // const handleSelection = (event) => {
  //   props.setUsers(value);
  // };
  // const findUserIdByName = (name) => {
  //   const id = names.find((id) => id.name === name);
  //   return id.id;
  // };
  // console.log(findUserIdByName("Alice Smith"));
  const findUserNameById = (id) => {
    console.log("names", names);
    const user = names.find((name) => name.id === id);
    console.log(user);
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
      </FormControl>
    </div>
  );
}

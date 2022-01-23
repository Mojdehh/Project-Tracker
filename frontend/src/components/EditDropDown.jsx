import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

  // React.useEffect(() => {
  //   return axios
  //     .get("http://localhost:8080/api/users")
  //     .then((users) => {
  //       setNames(users.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  const findIdByUserName = (name) => {
    console.log("names drop down", props.names);
    console.log("name drop down", name);
    const user = props.names.find((id) => id.full_name === name);
    //console.log(user);
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
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    props.setUsers(value);
    console.log("users drop down", props.users);
    // const newArr = names.find(
    //   (name) => name.full_name === value[value.length - 1]
    // );

    //console.log("newArr", newArr);
    console.log("value", value);
    const ids = getIds(value);
    props.setUserId(ids);
    console.log("Ids", ids);
    console.log("props.id", props.userId);
  };

  const arrDevs = (arr) => {
    const newArr = [];
    for (let item of arr) {
      newArr.push(item.devs);
    }
    return newArr;
  };
  console.log(props.names);

  //console.log(findIdByUserName("Alice Smith"));
  //const valueDevs = arrDevs(props.devs);
  //console.log("setUsers", props.users);
  //setPersonName(valueDevs);
  //console.log("personName", personName);
  //console.log(arrDevs(props.devs));
  function sort(arr1, arr2) {}
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

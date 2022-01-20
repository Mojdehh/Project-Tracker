import * as React from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  //event.preventDefault();
  // console.info("You clicked a breadcrumb.");
}

export default function BreadCrumbs(props) {
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Projects
        </Link>
        {props.project && (
          // asynchronous props.project[0] will load before receiving data
          <Typography color="text.primary">{props.project.name}</Typography>
        )}

        {props.projectName && (
          <Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Project Name
          </Link>
        )}
        {props.ticket && (
          <Typography color="text.primary">Ticket Name</Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}

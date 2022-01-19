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
          <Typography color="text.primary">Project Name</Typography>
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

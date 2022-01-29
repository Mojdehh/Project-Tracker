import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";

function handleClick(event) {

}

export default function BreadCrumbs(props) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "start",
        marginLeft: 20,
        marginTop: 10,
      }}
      role="presentation"
      onClick={handleClick}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          Projects
        </Link>
        {props.ticketName && props.projectName ? (
          <Link
            underline="hover"
            color="inherit"
            href={`/projects/${props.project_id}`}
          >
            {props.projectName}
          </Link>
        ) : (
          <Typography color="text.primary">{props.projectName}</Typography>
        )}
        {props.ticketName && (
          <Typography color="text.primary">
            Ticket: {props.ticketName}
          </Typography>
        )}
      </Breadcrumbs>
    </div>
  );
}
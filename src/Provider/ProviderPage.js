import React, { useEffect, useState } from "react";

import AppNavbar from "../Utils/AppNavbar";
import CheckIcon from "@material-ui/icons/Check";
import {
  Breadcrumbs,

  Link,
  Typography,

} from "@mui/material";

import { Divider, InputBase, Menu, MenuItem } from "@mui/material";
import Provider from "./provider";
function ProviderPage() {
  const refreshPage = () => {
    return window.localStorage.getItem("value"); // !! : cast to boolean
  };

  const [value, setValue] = useState(refreshPage());
  const handleSelect = (e) => {
    console.log(e);
    setValue(e);
    window.localStorage.setItem("value", e);
    window.location.reload(false);
  };

  const location = window.localStorage.getItem("county");

  return (
    <>
      <AppNavbar />
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="lightgrey" href="/location">
          Location
        </Link>
        <Link underline="hover" color="lightgrey" href="/dashboard">
          Home
        </Link>
        <Typography color="white">{value}</Typography>
      </Breadcrumbs>
      <Provider />
    </>
  );
}

export default ProviderPage;

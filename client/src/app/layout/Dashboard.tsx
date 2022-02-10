import React from "react";
import { Box } from "@mui/material";
import { Shortlink } from "../models/shortlink";
import ShortlinkForm from "./ShortlinkForm";
import ShortlinkList from "./ShortlinkList";

interface Props {
  shortlinks: Shortlink[];
  createOrEdit: (shortlink: Shortlink) => void;
  deleteShortlink: (id: string) => void;
}

export default function Dashboard({ shortlinks, createOrEdit, deleteShortlink }: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <ShortlinkForm createOrEdit={createOrEdit} />
      <ShortlinkList shortlinks={shortlinks} createOrEdit={createOrEdit} deleteShortlink={deleteShortlink} />
    </Box>
  );
}

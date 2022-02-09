import React from "react";
import { Box } from "@mui/material";
import { Shortlink } from "../models/shortlink";
import ShortlinkForm from "./ShortlinkForm";
import ShortlinkList from "./ShortlinkList";

interface Props {
  shortlinks: Shortlink[];
  selectedShortlink: Shortlink | undefined;
  selectShortlink: (id: string) => void;
  cancelSelectShortlink: () => void;
  createOrEdit: (shortlink: Shortlink) => void;
  deleteShortlink: (id: string) => void;
}

export default function Dashboard({
  shortlinks,
  selectedShortlink,
  selectShortlink,
  cancelSelectShortlink,
  createOrEdit,
  deleteShortlink,
}: Props) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
      <ShortlinkForm createOrEdit={createOrEdit} />
      <ShortlinkList
        shortlinks={shortlinks}
        selectedShortlink={selectedShortlink}
        selectShortlink={selectShortlink}
        cancelSelectShortlink={cancelSelectShortlink}
        createOrEdit={createOrEdit}
        deleteShortlink={deleteShortlink}
      />
    </Box>
  );
}

import { Backdrop, CircularProgress, Typography } from "@mui/material";
import React from "react";

interface Props {
  loading: boolean;
  content: string;
}

export default function Loading({ loading = true, content = "Loading..." }: Props) {
  return (
    <Backdrop sx={{ display: "flex", flexDirection: "column", color: "#fff" }} open={loading}>
      <CircularProgress color="inherit" />
      <Typography>{content}</Typography>
    </Backdrop>
  );
}

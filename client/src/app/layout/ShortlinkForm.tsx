import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { Shortlink } from "../models/shortlink";

interface Props {
  createOrEdit: (shortlink: Shortlink) => void;
}

export default function ShortlinkForm({ createOrEdit }: Props) {
  const [value, setValue] = useState<string>("");

  const initialState = {
    id: "",
    shortUrl: "",
    longUrl: "",
    creationDate: new Date().toISOString(),
    clicks: 0,
  };

  const [shortlink, setShortlink] = useState(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    const { name, value } = event.target;
    setShortlink({ ...shortlink, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEdit(shortlink);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", my: 2 }}
    >
      <Typography>Enter a URL to create a new shortlink!</Typography>
      <TextField value={value} onChange={handleChange} name="longUrl" size="small" placeholder="Paste your link here" />
      <Button type="submit" variant="contained">
        Create shortlink!
      </Button>
    </Box>
  );
}

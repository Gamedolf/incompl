import { Button, Paper, TextField, Typography } from "@mui/material";
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
    createOrEdit(shortlink);
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 2, my: 2 }}
    >
      <Typography sx={{ my: 1 }}>Enter a URL to create a new shortlink!</Typography>
      <TextField
        fullWidth
        value={value}
        onChange={handleChange}
        name="longUrl"
        size="small"
        placeholder="Paste your link here"
      />
      <Button sx={{ my: 1, width: "100%" }} type="submit" variant="contained">
        Create shortlink!
      </Button>
    </Paper>
  );
}

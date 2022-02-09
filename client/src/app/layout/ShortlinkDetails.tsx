import React, { useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  Tooltip,
  Typography,
  IconButton,
  Box,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { Shortlink } from "../models/shortlink";

interface Props {
  shortlink: Shortlink;
  cancelSelectShortlink: () => void;
}

export default function ShortlinkDetails({ shortlink, cancelSelectShortlink }: Props) {
  const [value, setValue] = useState<string>(shortlink.longUrl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <TableContainer component="form" sx={{ maxWidth: 700 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">Shortlink</TableCell>
            <TableCell align="center">Destination</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key={shortlink.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="center">
              <Link href={`http://localhost:5000/${shortlink.shortUrl}`}>{shortlink.shortUrl}</Link>
            </TableCell>
            <TableCell align="center">
              <TextField
                label="New destination"
                placeholder={shortlink.longUrl}
                onChange={handleChange}
                id="outlined-size-small"
                size="small"
                value={value}
              >
                {shortlink.longUrl}
              </TextField>
            </TableCell>
            <TableCell align="center">
              <Tooltip title="Save">
                <IconButton color="primary">
                  <SaveIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel">
                <IconButton color="error">
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}

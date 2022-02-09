import React, { useState } from "react";
import { TableRow, TableCell, Link, Tooltip, Typography, IconButton, TextField, Box } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import { Shortlink } from "../models/shortlink";

const truncate = (str: string) => {
  str = str.replace("https://www.", "").replace("http://www.", "").replace("http://", "").replace("https://", "");
  return str.length > 20 ? str.substring(0, 19) + "…" : str;
};

interface Props {
  shortlink: Shortlink;
  selectShortlink: (id: string) => void;
  cancelSelectShortlink: () => void;
  createOrEdit: (shortlink: Shortlink) => void;
  deleteShortlink: (id: string) => void;
}

export default function ShortlinkRow({
  shortlink,
  selectShortlink,
  cancelSelectShortlink,
  createOrEdit,
  deleteShortlink,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [value, setValue] = useState<string>(shortlink.longUrl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleEditMode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    selectShortlink(shortlink.id);
    setEditMode(true);
  };

  const handleCancel = () => {
    cancelSelectShortlink();
    setEditMode(false);
  };

  const handleSubmit = () => {
    console.log(shortlink);
  };

  const handleSave = () => {
    handleSubmit();
    createOrEdit(shortlink);
    cancelSelectShortlink();
    setEditMode(false);
  };

  return (
    <TableRow key={shortlink.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell align="center">
        <Link href={`http://localhost:5000/${shortlink.shortUrl}`}>{shortlink.shortUrl}</Link>
      </TableCell>
      {editMode ? (
        <TableCell align="center">
          <Box component="form" id={"form" + shortlink.shortUrl} onSubmit={handleSubmit} autoComplete="off">
            <TextField
              sx={{ maxWidth: "fit-content", minWidth: 141 }}
              placeholder={shortlink.longUrl}
              label="New destination"
              size="small"
              value={value}
              onChange={handleChange}
            />
          </Box>
        </TableCell>
      ) : (
        <TableCell align="center">
          <Link href={value}>{truncate(value)}</Link>
        </TableCell>
      )}
      <TableCell align="center">
        <Tooltip title={new Date(shortlink.creationDate).toTimeString()} placement="top">
          <Typography>{new Date(shortlink.creationDate).toDateString()}</Typography>
        </Tooltip>
      </TableCell>
      <TableCell align="center">{shortlink.clicks}</TableCell>
      {editMode ? (
        <TableCell align="center">
          <Tooltip title="Save">
            <IconButton onClick={handleSave} type="submit" form={"form" + shortlink.shortUrl} color="primary">
              <SaveIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Close">
            <IconButton onClick={handleCancel} color="error">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      ) : (
        <TableCell align="center">
          <Tooltip title="Edit destination">
            <IconButton onClick={(e) => handleEditMode(e)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteShortlink(shortlink.id)} color="error">
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}

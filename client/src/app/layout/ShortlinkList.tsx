import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Shortlink } from "../models/shortlink";
import ShortlinkRow from "./ShortlinkRow";

interface Props {
  shortlinks: Shortlink[];
  createOrEdit: (shortlink: Shortlink) => void;
  deleteShortlink: (id: string) => void;
}

export default function ShortlinkList({ shortlinks, createOrEdit, deleteShortlink }: Props) {
  const renderTable = (arr: Shortlink[]) => {
    if (arr.length === 0) {
      return <div>Create your first shortlink!</div>;
    } else {
      return (
        <TableContainer component="div" sx={{ maxWidth: 1000 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Shortlink</TableCell>
                <TableCell align="center">Destination</TableCell>
                <TableCell align="center">Creation date</TableCell>
                <TableCell align="center">Clicks</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {shortlinks.sort().map((shortlink) => (
                <ShortlinkRow
                  shortlink={shortlink}
                  key={shortlink.id}
                  createOrEdit={createOrEdit}
                  deleteShortlink={deleteShortlink}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    }
  };

  return renderTable(shortlinks);
}

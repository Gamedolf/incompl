import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shortlink } from "../models/shortlink";
import NavBar from "./NavBar";
import { Container } from "@mui/material";
import Dashboard from "./Dashboard";
import { v4 as uuid } from "uuid";

export default function App() {
  const [shortlinks, setShortlinks] = useState<Shortlink[]>([]);
  const [selectedShortlink, setSelectedShortlink] = useState<Shortlink | undefined>(undefined);

  useEffect(() => {
    axios.get<Shortlink[]>("http://localhost:5000/api/Shortlinks").then((response) => {
      setShortlinks(response.data);
    });
  }, []);

  const handleSelectShortlink = (id: string) => {
    setSelectedShortlink(shortlinks.find((shortlink) => shortlink.id === id));
  };

  const handleCancelSelectShortlink = () => {
    setSelectedShortlink(undefined);
  };

  const handleCreateOrEditShortlink = (shortlink: Shortlink) => {
    shortlink.id
      ? setShortlinks([...shortlinks.filter((x) => x.id !== shortlink.id), shortlink])
      : setShortlinks([...shortlinks, { ...shortlink, id: uuid() }]);
  };

  const handleDeleteShortlink = (id: string) => {
    setShortlinks([...shortlinks.filter((x) => x.id !== id)]);
  };

  return (
    <>
      <NavBar />
      <Container maxWidth="xl">
        <Dashboard
          shortlinks={shortlinks}
          selectedShortlink={selectedShortlink}
          selectShortlink={handleSelectShortlink}
          cancelSelectShortlink={handleCancelSelectShortlink}
          createOrEdit={handleCreateOrEditShortlink}
          deleteShortlink={handleDeleteShortlink}
        />
      </Container>
    </>
  );
}

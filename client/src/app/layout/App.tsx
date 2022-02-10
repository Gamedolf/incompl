import React, { useEffect, useState } from "react";
import { Shortlink } from "../models/shortlink";
import NavBar from "./NavBar";
import { Backdrop, CircularProgress, Container, Typography } from "@mui/material";
import Dashboard from "./Dashboard";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import Loading from "./Loading";

export default function App() {
  const [shortlinks, setShortlinks] = useState<Shortlink[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Shortlinks.list().then((response) => {
      setShortlinks(response);
      setLoading(false);
    });
  }, []);

  const handleCreateOrEditShortlink = (shortlink: Shortlink) => {
    setSubmitting(true);
    if (shortlink.id) {
      agent.Shortlinks.update(shortlink).then(() => {
        setShortlinks([...shortlinks.filter((x) => x.id !== shortlink.id), shortlink]);
        setSubmitting(false);
      });
    } else {
      shortlink.id = uuid();
      agent.Shortlinks.create(shortlink).then(() => {
        setShortlinks([...shortlinks, shortlink]);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteShortlink = (id: string) => {
    setSubmitting(true);
    agent.Shortlinks.delete(id).then(() => {
      setShortlinks([...shortlinks.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  };

  if (loading) return <Loading loading={loading} content="Loading app" />;

  return (
    <>
      <Backdrop sx={{ display: "flex", flexDirection: "column", color: "#fff" }} open={loading}>
        <CircularProgress color="inherit" />
        <Typography>Loading app</Typography>
      </Backdrop>
      <NavBar />

      <Container maxWidth="xl">
        <Dashboard
          shortlinks={shortlinks}
          createOrEdit={handleCreateOrEditShortlink}
          deleteShortlink={handleDeleteShortlink}
        />
      </Container>
    </>
  );
}

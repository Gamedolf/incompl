import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shortlink } from "../models/shortlink";
import NavBar from "./NavBar";

function App() {
  const [shortlinks, setShortlinks] = useState<Shortlink[]>([]);

  useEffect(() => {
    axios.get<Shortlink[]>("http://localhost:5000/api/Shortlinks").then((response) => {
      setShortlinks(response.data);
    });
  }, []);

  return (
    <div className="App">
      <NavBar />
      <header className="App-header">
        <ul>
          {shortlinks.map((shortlink) => (
            <li key={shortlink.id}>{shortlink.longUrl}</li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;

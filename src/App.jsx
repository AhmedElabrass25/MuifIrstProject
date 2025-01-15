import React, { useState } from "react";
import Home from "./component/Home/Home";
import Create from "./component/Create/Create";
import Header from "./component/Header/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NotFound from "./component/NotFound/NotFound";

const App = () => {
  const drawerWidth = 240;
  const [theMode, setTheMode] = useState(
    localStorage.getItem("theme") || "light"
  );
  const darkTheme = createTheme({
    palette: {
      mode: theMode,
    },
  });
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Header
            setTheMode={setTheMode}
            theMode={theMode}
            drawerWidth={drawerWidth}
          />
          <Routes>
            <Route path="/" element={<Home drawerWidth={drawerWidth} />} />
            <Route
              path="create"
              element={<Create drawerWidth={drawerWidth} />}
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;

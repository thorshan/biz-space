import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ColorModeProvider } from "./contexts/ThemeContext";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ColorModeProvider>
          <AppRoutes />
        </ColorModeProvider>
      </BrowserRouter>
    </>
  );
};

export default App;

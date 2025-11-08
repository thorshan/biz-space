import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ColorModeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <ColorModeProvider>
            <AppRoutes />
          </ColorModeProvider>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
};

export default App;

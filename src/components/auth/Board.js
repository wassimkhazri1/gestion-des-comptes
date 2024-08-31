import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Topbar from "../../scenes/global/Topbar";
import Sidebar from "../../scenes/global/Sidebar";
//CreatedAndDevelopedByWassimKhazri
//https://www.linkedin.com/in/wassim-khazri-ab923a14b/
import Team from "../../scenes/team/index";
import Invoices from "../../scenes/invoices/index";
import Contacts from "../../scenes/contacts/index";
import Bar from "../../scenes/bar/index";
import Form from "../../scenes/form/index";
import Line from "../../scenes/line/index";
import Pie from "../../scenes/pie/index";
import FAQ from "../../scenes/faq/index";
import Geography from "../../scenes/geography/index";
import Calendar from "../../scenes/calendar/calendar";
import { ColorModeContext, useMode } from "../../theme";
import "./styles.css";


function Board() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
     <div style={{ width: '100%',margin:'0%' }}>
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/team" element={<Team />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
     </div>
  );
}

export default Board;

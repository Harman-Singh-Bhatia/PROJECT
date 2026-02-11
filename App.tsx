import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkyLayout } from "./skystrike/layout/SkyLayout";
import { Dashboard } from "./skystrike/pages/Dashboard";
import { Missions } from "./skystrike/pages/Missions";
import { ActiveMission } from "./skystrike/pages/ActiveMission";
import { Pilots } from "./skystrike/pages/Pilots";
import { Logs } from "./skystrike/pages/Logs";
import { NotFound } from "./skystrike/pages/NotFound";
import { AccessScreen } from "./skystrike/auth/AccessScreen";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AccessScreen onAccessGranted={() => setIsAuthenticated(true)} />;
  }

  return (
    <BrowserRouter>
      <div className="skystrike-root">
        <Routes>
          <Route path="/" element={<SkyLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="missions" element={<Missions />} />
            <Route path="active-mission" element={<ActiveMission />} />
            <Route path="pilots" element={<Pilots />} />
            <Route path="logs" element={<Logs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

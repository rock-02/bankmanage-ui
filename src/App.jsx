import React from "react";
import HomePage from "./Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import BranchPage from "./Pages/BranchPage";

const App = () => {
  return (
    <div>
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/branches/:id" element={<BranchPage />} />
      </Routes>
    </div>
  );
};

export default App;

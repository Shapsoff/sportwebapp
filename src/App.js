import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./Home.js";
import OtherPage from "./OtherPage.js";

export default function App() {
  const [exercisesSaved, setExercisesSaved] = useState([]);

  useEffect(() => {
    localStorage.setItem('exercises', JSON.stringify(exercisesSaved));
  }, [exercisesSaved]);

  return (
    <HashRouter>
      <Routes>
      <Route path="/">
          <Route index element={<Home exercisesSaved={exercisesSaved} setExercisesSaved={setExercisesSaved} />} />
          <Route path="training" element={<OtherPage exercisesSaved={exercisesSaved} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
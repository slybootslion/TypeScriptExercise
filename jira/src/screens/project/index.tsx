import React from 'react'
import { Link, Navigate } from "react-router-dom";
import { Routes, Route } from 'react-router'
import { EpicScreen } from "../epic";
import { KanbanScreen } from "../kanban";

export const ProjectScreen = () => {
  return <div>
    <h2>project screen</h2>
    <Link to='kanban'>看板</Link>
    <Link to='epic'>任务组</Link>
    <Routes>
      <Route path='/kanban' element={<KanbanScreen />} />
      <Route path='/epic' element={<EpicScreen />} />
      <Route path='' element={<Navigate to={'kanban'} />} />
    </Routes>
  </div>
}

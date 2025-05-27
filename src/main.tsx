// src/index.js (or src/index.tsx)
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Your global styles
import AppWrapper from './App'; // Assuming AppWrapper is the new name for your App component with Router
import reportWebVitals from './reportWebVitals';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
// Entry point for the React app
// TODO: render <App /> and set up providers (auth, router) as needed

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

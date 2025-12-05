// Main App: small landing page until full routing is implemented
// TODO: replace static landing with Router and modular components

import React from 'react';

export default function App() {
  return (
    <div className="app-root">
      <header className="nav">
        <div className="container nav-inner">
          <div className="logo">🌱 EcoTracker</div>
          <nav>
            <a href="#features">Features</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container">
            <h1>Track your carbon footprint</h1>
            <p className="lead">Log vehicle trips, single-use plastics, heating and tree planting — see your CO₂ impact.</p>
            <a className="btn" href="#dashboard">Open Dashboard</a>
          </div>
        </section>

        <section id="features" className="features container">
          <h2>Core Features</h2>
          <ul>
            <li>Vehicle emissions by distance, vehicle & fuel type</li>
            <li>Single-use plastics logging and impact</li>
            <li>Tree planting offsets and planting calculator</li>
            <li>Residential heating (kWh & fuel types)</li>
          </ul>
        </section>

        <section id="about" className="container about">
          <h2>About</h2>
          <p>EcoTracker helps you understand and reduce your carbon footprint with easy logging, analytics and suggestions.</p>
        </section>

        <section id="contact" className="container contact">
          <h2>Contact</h2>
          <p>support@ecotracker.local</p>
        </section>
      </main>

      <footer className="footer">
        <div className="container">© 2025 EcoTracker</div>
      </footer>
    </div>
  );
}

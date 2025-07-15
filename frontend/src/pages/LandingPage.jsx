import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navbar */}
      <nav className="landing-navbar">
        <div className="logo">FinTrack</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <a href="#contact-section">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="landing-hero">
        <h1>Welcome to FinTrack</h1>
        <p>Track your expenses, visualize your spending, and manage your budget like a pro.</p>
        <Link to="/login" className="cta-button">Get Started</Link>
      </header>

      {/* Feature Highlights */}
      <section className="features">
        <h2>Why Choose FinTrack?</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>Expense Tracking</h3>
            <p>Monitor your spending habits and stay in control of your finances.</p>
          </div>
          <div className="feature-card">
            <h3>Interactive Charts</h3>
            <p>Visualize expenses by category, date, or amount with interactive graphs.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Budgeting</h3>
            <p>Set and manage budgets for different goals and categories.</p>
          </div>
          <div className="feature-card">
            <h3>Cloud Sync</h3>
            <p>Access your data anytime across devices with real-time sync.</p>
          </div>
          <div className="feature-card">
            <h3>Secure Authentication</h3>
            <p>Stay protected with JWT-based login and session management.</p>
          </div>
          <div className="feature-card">
            <h3>Mobile-Friendly</h3>
            <p>Use FinTrack on any device with our responsive design support.</p>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="contact-section" id="contact-section">
        <h2>Contact Us</h2>
        <p className="contact-description">Have questions or suggestions? We'd love to hear from you!</p>
        <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
          <div className="contact-grid">
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
          </div>
          <textarea rows="5" placeholder="Your Message" required></textarea>
          <button type="submit">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2025 FinTrack. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

/** @format */

import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="game-footer">
      <div className="footer-content">
        <span className="footer-name">Ryan Cameron</span>
        
        <div className="footer-links">
          <a 
            href="https://github.com/ryancameron555" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="GitHub"
          >
            <span className="link-icon">⚡</span>
            <span className="link-text">GitHub</span>
          </a>
          
          <a 
            href="https://www.linkedin.com/in/ryan-cameron-003686158" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="LinkedIn"
          >
            <span className="link-icon">◆</span>
            <span className="link-text">LinkedIn</span>
          </a>
          
          <a 
            href="https://ryancameron555.github.io/PortfolioPage/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
            aria-label="Portfolio"
          >
            <span className="link-icon">♦</span>
            <span className="link-text">Portfolio</span>
          </a>
          
          <a 
            href="mailto:ryancameron555@gmail.com"
            className="footer-link"
            aria-label="Email"
          >
            <span className="link-icon">✉</span>
            <span className="link-text">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import React from 'react';
import './SocialLinks.css';

const SocialLinks = () => {
    return (
        <ul className="social-links-container">
            <li data-tooltip="LinkedIn" style={{ '--bg': '#0077b5' }}>
                <a href="https://www.linkedin.com/in/ayushhraj28/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <i className="fa-brands fa-linkedin-in"></i>
                </a>
            </li>

            <li data-tooltip="GitHub" style={{ '--bg': '#333' }}>
                <a href="https://github.com/Ayushhraj28" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <i className="fa-brands fa-github"></i>
                </a>
            </li>

            <li data-tooltip="Instagram" style={{ '--bg': 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}>
                <a href="https://www.instagram.com/magical__ayush/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fa-brands fa-instagram"></i>
                </a>
            </li>
        </ul>
    );
};

export default SocialLinks;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 100,
                padding: scrolled ? '15px 0' : '30px 0', // Shrink padding on scroll
                background: scrolled ? 'rgba(5, 5, 5, 0.8)' : 'transparent', // Dark semi-transparent background
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
        >
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo */}
                <a href="#home" style={{ textDecoration: 'none' }}>
                    <motion.span
                        animate={{ fontSize: scrolled ? '1rem' : '1.2rem' }}
                        style={{ fontWeight: '700', color: '#fff', letterSpacing: '0.05em' }}
                    >
                        AYUSH RAJ
                    </motion.span>
                </a>

                {/* Links */}
                <div style={{ display: 'flex', gap: '30px' }}>
                    {['Home', 'About', 'Works', 'Contact'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            style={{
                                textDecoration: 'none',
                                color: '#fff',
                                fontWeight: '500',
                                fontSize: '0.95rem',
                                opacity: 0.7,
                                position: 'relative'
                            }}
                            onMouseEnter={(e) => e.target.style.opacity = 1}
                            onMouseLeave={(e) => e.target.style.opacity = 0.7}
                        >
                            {item}
                            {/* Underline animation could be added here with a pseudo-element or motion.div if desired, sticking to simple opacity for now as per "premium" feel often implies subtlety */}
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

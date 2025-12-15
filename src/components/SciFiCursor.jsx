import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SciFiCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        const handleMouseOver = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A' || e.target.closest('[data-hover="true"]')) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <>
            {/* Main Crosshair */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mousePosition.x - 15,
                    y: mousePosition.y - 15,
                    width: '30px',
                    height: '30px',
                    border: '1px solid var(--neon-cyan)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999,
                    mixBlendMode: 'difference'
                }}
                animate={{
                    scale: isHovering ? 1.5 : 1,
                    rotate: isHovering ? 90 : 0,
                    borderColor: isHovering ? 'var(--neon-magenta)' : 'var(--neon-cyan)'
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            >
                {/* Crosshair Lines */}
                <div style={{ position: 'absolute', top: '50%', left: '-5px', width: '40px', height: '1px', background: 'var(--neon-cyan)', opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', left: '50%', top: '-5px', width: '1px', height: '40px', background: 'var(--neon-cyan)', opacity: 0.5 }}></div>
            </motion.div>

            {/* Trailing Dot */}
            <motion.div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    x: mousePosition.x - 2,
                    y: mousePosition.y - 2,
                    width: '4px',
                    height: '4px',
                    background: 'var(--neon-magenta)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    zIndex: 9999
                }}
                animate={{
                    scale: isHovering ? 0 : 1
                }}
            />
        </>
    );
};

export default SciFiCursor;

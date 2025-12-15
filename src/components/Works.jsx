import React from 'react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: 'ScanTAPS',
        category: 'Full Stack • NFC Technology',
        image: '/assets/scantaps.png',
        link: '#'
    },
    {
        title: 'PillBuddy',
        category: 'HealthTech • IoT',
        image: '/assets/pillbuddy.png',
        link: '#'
    },
    {
        title: 'TANGO',
        category: 'AI • Research',
        image: '/assets/tango.png',
        link: '#'
    }
];

const ProjectCard = ({ project, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
            <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                style={{
                    position: 'relative',
                    overflow: 'hidden',
                    borderRadius: '24px',
                    background: '#0a0a0a',
                    border: '1px solid rgba(255,255,255,0.05)',
                    cursor: 'pointer'
                }}
            >
                {/* Image Container with Gradient Overlay */}
                <div style={{
                    position: 'relative',
                    height: '400px',
                    overflow: 'hidden'
                }}>
                    <motion.img
                        src={project.image}
                        alt={project.title}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />

                    {/* White Gradient Edges */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: `
                                linear-gradient(to right, rgba(255,255,255,0.15) 0%, transparent 15%, transparent 85%, rgba(255,255,255,0.15) 100%),
                                linear-gradient(to bottom, rgba(255,255,255,0.15) 0%, transparent 15%, transparent 85%, rgba(255,255,255,0.15) 100%)
                            `,
                        pointerEvents: 'none'
                    }} />

                    {/* Dark Gradient Overlay for Text Readability */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '50%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)',
                        pointerEvents: 'none'
                    }} />
                </div>

                {/* Content */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2rem',
                    zIndex: 2
                }}>
                    <motion.h3
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            fontSize: '2rem',
                            marginBottom: '0.5rem',
                            color: 'white',
                            fontWeight: '600'
                        }}
                    >
                        {project.title}
                    </motion.h3>

                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                        {project.category.split('•').map((tag, i) => (
                            <span key={i} style={{
                                padding: '0.4rem 0.9rem',
                                borderRadius: '50px',
                                fontSize: '0.85rem',
                                color: 'rgba(255,255,255,0.8)',
                                background: 'rgba(255,255,255,0.1)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                                {tag.trim()}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hover Glow Effect */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%)',
                        pointerEvents: 'none'
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

const Works = () => {
    return (
        <section id="works" className="section bg-black" style={{ color: 'white', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '4rem', textAlign: 'center' }}
                >
                    <h5 style={{ color: '#888', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem' }}>PORTFOLIO</h5>
                    <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white', lineHeight: '1.1' }}>
                        SELECTED<br />WORKS
                    </h2>
                </motion.div>

                {/* Grid Layout */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '2.5rem',
                    maxWidth: '1400px',
                    margin: '0 auto'
                }}>
                    {projects.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Works;

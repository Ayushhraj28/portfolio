import React from 'react';
import { motion } from 'framer-motion';

const Projects = () => {
    const projects = [
        {
            title: 'ScanTAPS',
            subtitle: 'NFC + QR Lost & Found Ecosystem',
            desc: 'Campus-wide tag system for real-time item reunification. Used by students for wallets, keys, and laptops.',
            tech: ['NFC', 'QR', 'React', 'Firebase'],
            color: 'var(--neon-cyan)'
        },
        {
            title: 'PillBuddy',
            subtitle: 'AI-Powered Medication Dispenser',
            desc: 'SunHacks Winner 2024. Automated dosage dispensing with tracking and reminders to prevent misuse.',
            tech: ['AI', 'IoT', 'Mobile App', 'Hardware'],
            color: 'var(--neon-green)'
        },
        {
            title: 'TANGO',
            subtitle: 'Autonomous LEGO EV3 Tank',
            desc: 'Self-navigating tank using sensors and programmed logic for obstacle detection and autonomous missions.',
            tech: ['C++', 'Sensors', 'Robotics', 'Algorithms'],
            color: 'var(--neon-magenta)'
        }
    ];

    return (
        <section style={{ padding: '100px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{
                        color: '#fff',
                        marginBottom: '4rem',
                        textAlign: 'center',
                        fontSize: '2.5rem'
                    }}
                >
                    MISSION LOGS
                </motion.h2>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '2rem'
                }}>
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.02)',
                                border: `1px solid ${project.color}`,
                                padding: '2rem',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            {/* Glitch Overlay on Hover */}
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '4px',
                                background: project.color,
                                boxShadow: `0 0 10px ${project.color}`
                            }}></div>

                            <h3 style={{ fontSize: '1.8rem', marginBottom: '0.5rem', color: '#fff' }}>{project.title}</h3>
                            <h4 style={{ fontSize: '1rem', color: project.color, marginBottom: '1rem', fontFamily: 'var(--font-cyber)' }}>{project.subtitle}</h4>
                            <p style={{ color: '#a0a0a0', marginBottom: '1.5rem', fontSize: '0.95rem' }}>{project.desc}</p>

                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {project.tech.map((t, i) => (
                                    <span key={i} style={{
                                        fontSize: '0.8rem',
                                        padding: '0.2rem 0.8rem',
                                        border: '1px solid rgba(255, 255, 255, 0.2)',
                                        borderRadius: '20px',
                                        color: '#fff'
                                    }}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;

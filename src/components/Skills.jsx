import React from 'react';
import { motion } from 'framer-motion';

const skills = [
    'HTML', 'CSS', 'JavaScript', 'Python', 'Java', 'React', 'Node.js',
    'MATLAB', 'Machine Learning', 'Data Science', 'Web Dev', 'Git',
    'Figma', 'Three.js', 'Next.js', 'Tailwind'
];

const Skills = () => {
    return (
        <section id="skills" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '4rem' }}
                >
                    <h5 style={{ color: '#888', marginBottom: '1rem' }}>EXPERTISE</h5>
                    <h2 style={{ fontSize: '2.5rem' }}>TECHNICAL ARSENAL</h2>
                </motion.div>

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
                    {skills.map((skill, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.05,
                                ease: "backOut"
                            }}
                            whileHover={{
                                scale: 1.1,
                                y: -5,
                                boxShadow: "0 5px 15px rgba(255,255,255,0.1)",
                                borderColor: "rgba(255,255,255,0.5)"
                            }}
                            style={{
                                padding: '0.8rem 1.5rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '50px',
                                cursor: 'default',
                                fontSize: '0.95rem',
                                fontWeight: '500',
                                color: 'var(--gray-dark)',
                                transition: 'border-color 0.3s'
                            }}
                        >
                            {skill}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;

import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section id="about" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
                    {/* Text Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-20%" }}
                    >
                        <motion.h5 variants={itemVariants} style={{ color: '#888', marginBottom: '1rem' }}>WHO I AM</motion.h5>
                        <motion.h2 variants={itemVariants} style={{ marginBottom: '2rem', fontSize: '2.5rem' }}>
                            Engineering the future with <span style={{ color: 'rgba(255,255,255,0.5)' }}>code & creativity.</span>
                        </motion.h2>
                        <motion.p variants={itemVariants} style={{ color: 'var(--gray-dark)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                            I'm Ayush Raj, a Computer Science undergraduate at Arizona State University with a 4.0 GPA. I specialize in building high-performance web applications and AI-driven solutions.
                        </motion.p>
                        <motion.ul variants={containerVariants} style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '1rem' }}>
                            {['Full Stack Development', 'AI & Machine Learning', 'UI/UX Design', 'Cloud Architecture'].map((item, i) => (
                                <motion.li
                                    key={i}
                                    variants={itemVariants}
                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}
                                >
                                    <span style={{ width: '6px', height: '6px', background: 'white', borderRadius: '50%' }}></span>
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* Image/Visual */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        style={{ position: 'relative' }}
                    >
                        <div style={{
                            width: '100%',
                            height: '500px',
                            background: 'linear-gradient(45deg, #1a1a1a, #050505)',
                            borderRadius: '20px',
                            overflow: 'hidden',
                            position: 'relative'
                        }}>
                            {/* Placeholder for personal image */}
                            <img
                                src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1000&auto=format&fit=crop"
                                alt="Ayush Raj"
                                style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                            />
                            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }}></div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;

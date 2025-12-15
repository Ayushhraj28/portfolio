import React from 'react';
import { motion } from 'framer-motion';

const services = [
    {
        title: 'Engineering',
        description: 'Full-stack development with a focus on scalable, high-performance applications using React, Node.js, and Python.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'AI Solutions',
        description: 'Integrating cutting-edge machine learning models and AI agents to automate workflows and enhance user experiences.',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000&auto=format&fit=crop'
    },
    {
        title: 'Product Design',
        description: 'Crafting intuitive, user-centric interfaces that combine aesthetics with functionality for maximum engagement.',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=1000&auto=format&fit=crop'
    }
];

const Services = () => {
    return (
        <section id="about" className="section">
            <div className="container">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h5>WHAT I DO</h5>
                            <h2 style={{ marginTop: '1rem' }}>SERVICES</h2>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ maxWidth: '400px' }}
                        >
                            I combine technical expertise with creative design to build digital products that stand out.
                        </motion.p>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                style={{ group: 'hover' }}
                            >
                                <div style={{ overflow: 'hidden', borderRadius: '12px', marginBottom: '1.5rem', height: '300px' }}>
                                    <motion.img
                                        src={service.image}
                                        alt={service.title}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                                <h3>{service.title}</h3>
                                <p style={{ marginTop: '1rem', fontSize: '0.95rem' }}>{service.description}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Services;

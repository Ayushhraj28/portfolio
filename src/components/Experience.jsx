import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const experiences = [
    {
        role: 'Technical Lead — ScanTAPS',
        org: 'ASU Lost & Found Automation System',
        period: '2024 – Present',
        description: [
            'Leading the end-to-end development of ScanTAPS, an NFC + QR–powered campus-wide tagging system.',
            'Designing backend architecture, UI/UX flows, and secure item-tracking logic.',
            'Coordinating cross-functional teams for testing, deployment, and scalability.'
        ]
    },
    {
        role: 'Applicant Services Frontline Representative',
        org: 'Arizona State University',
        period: '2025 – Present',
        description: [
            'Delivering frontline support to prospective students and families.',
            'Handling calls, inquiries, and admission guidance with clarity and professionalism.',
            'Managing data entry, student records, and communication workflows.'
        ]
    },
    {
        role: 'Hackathon Winner',
        org: 'SunHacks 2024',
        period: '2024',
        description: [
            'Best Hardware Hack — PillBuddy.',
            'Developed an AI-powered medical dispenser with automated dosage control.',
            'Built seamless hardware + software integration within a 24-hour time frame.',
            'Secured 1st place among competing university teams.'
        ]
    },
    {
        role: 'Head Boy',
        org: 'School Leadership',
        period: '2020 – 2021',
        description: [
            'Directed student council operations and major school initiatives.',
            'Organized academic, cultural, and discipline-related programs.',
            'Acted as the primary student representative for school-wide events.'
        ]
    }
];

const ExperienceItem = ({ exp, index }) => {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, x: isEven ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: 'flex',
                justifyContent: isEven ? 'flex-end' : 'flex-start',
                paddingBottom: '4rem',
                position: 'relative',
                width: '50%',
                marginLeft: isEven ? '0' : '50%',
                paddingRight: isEven ? '3rem' : '0',
                paddingLeft: isEven ? '0' : '3rem',
                textAlign: isEven ? 'right' : 'left'
            }}
        >
            {/* Dot on the timeline */}
            <div style={{
                position: 'absolute',
                [isEven ? 'right' : 'left']: '-6px',
                top: '0',
                width: '12px',
                height: '12px',
                background: 'white',
                borderRadius: '50%',
                border: '2px solid black',
                zIndex: 2
            }}></div>

            <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{exp.role}</h3>
                <h4 style={{ fontSize: '1.1rem', color: '#888', marginBottom: '1rem' }}>{exp.org}</h4>
                <ul style={{
                    fontSize: '0.95rem',
                    color: 'var(--gray-dark)',
                    lineHeight: '1.6',
                    listStyleType: 'none',
                    padding: 0,
                    margin: 0
                }}>
                    {exp.description.map((point, i) => (
                        <li key={i} style={{ marginBottom: '0.5rem', position: 'relative' }}>
                            {point}
                        </li>
                    ))}
                </ul>
                <span style={{
                    display: 'inline-block',
                    marginTop: '1rem',
                    fontSize: '0.85rem',
                    padding: '0.4rem 1rem',
                    background: 'rgba(255,255,255,0.1)',
                    borderRadius: '20px'
                }}>
                    {exp.period}
                </span>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="experience" className="section" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '6rem' }}
                >
                    <h5 style={{ color: '#888', marginBottom: '1rem' }}>JOURNEY</h5>
                    <h2 style={{ fontSize: '2.5rem' }}>EXPERIENCE &<br />LEADERSHIP</h2>
                </motion.div>

                <div ref={ref} style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Timeline Line */}
                    <motion.div style={{
                        position: 'absolute',
                        left: '50%',
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: 'rgba(255,255,255,0.2)',
                        transformOrigin: 'top',
                        scaleY
                    }}></motion.div>

                    {experiences.map((exp, index) => (
                        <ExperienceItem key={index} exp={exp} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;

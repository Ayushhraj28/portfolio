import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const achievements = [
    {
        title: 'SunHacks 2024',
        subtitle: 'Best Hardware Hack',
        description: 'Awarded for innovative integration of hardware and software solutions.'
    },
    {
        title: 'JEE Advanced',
        subtitle: 'Scholar AIR 6355',
        description: 'Achieved All India Rank 6355 among 1.5 million candidates in one of the world\'s toughest exams.'
    },
    {
        title: 'Dean\'s List',
        subtitle: 'Academic Excellence',
        description: 'Fall 24, Spring 25, Fall 25. Recognized for outstanding academic performance.'
    },
    {
        title: 'Scholarship',
        subtitle: 'New American University Scholar',
        description: 'Prestigious merit-based scholarship awarded for academic distinction.'
    },
    {
        title: 'Scholarship',
        subtitle: 'Stanley C. & Helen K. Delpier',
        description: 'Awarded for demonstrated leadership and academic achievement.'
    }
];

const AchievementItem = ({ item, index }) => {
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
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <h4 style={{ fontSize: '1.1rem', color: '#888', marginBottom: '1rem' }}>{item.subtitle}</h4>
                <p style={{ fontSize: '0.95rem', color: 'var(--gray-dark)', lineHeight: '1.6' }}>
                    {item.description}
                </p>
            </div>
        </motion.div>
    );
};

const Reviews = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section className="section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: '6rem' }}
                >
                    <h5 style={{ color: '#888', marginBottom: '1rem' }}>RECOGNITION</h5>
                    <h2 style={{ fontSize: '2.5rem' }}>AWARDS &<br />ACHIEVEMENTS</h2>
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

                    {achievements.map((item, index) => (
                        <AchievementItem key={index} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Reviews;

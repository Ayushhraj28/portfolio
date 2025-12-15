import React from 'react';
import { motion } from 'framer-motion';
import SocialLinks from './SocialLinks';

const Contact = () => {
    return (
        <section id="contact" className="section" style={{ paddingBottom: '0', position: 'relative', overflow: 'hidden' }}>
            <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                <div style={{
                    background: 'var(--black)',
                    color: 'white',
                    borderRadius: '30px 30px 0 0',
                    padding: '6rem 4rem 2rem 4rem',
                    textAlign: 'center'
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h5 style={{ color: '#888', marginBottom: '2rem' }}>CONTACT ME</h5>
                        <h2 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: '0.9', marginBottom: '2rem' }}>
                            GET IN<br />
                            <span style={{ color: 'transparent', WebkitTextStroke: '1px white' }}>TOUCH</span>
                        </h2>

                        <p style={{
                            color: 'var(--gray-dark)',
                            maxWidth: '600px',
                            margin: '0 auto 4rem auto',
                            fontSize: '1.1rem',
                            lineHeight: '1.6'
                        }}>
                            I'm currently looking for new opportunities. Whether you have a question, a project idea, or just want to say hi, my inbox is always open.
                        </p>

                        <form
                            action="https://formsubmit.co/ayush.climax1234@gmail.com"
                            method="POST"
                            style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'left' }}
                        >
                            {/* Honeypot to prevent spam */}
                            <input type="text" name="_honey" style={{ display: 'none' }} />
                            {/* Disable Captcha for cleaner UX */}
                            <input type="hidden" name="_captcha" value="false" />
                            {/* Success Page (optional, defaults to generic success) */}
                            <input type="hidden" name="_next" value="https://ayushraj.co" />

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="e.g., Ayush Raj"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>Your Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="e.g., ayush@example.com"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                />
                            </div>

                            <div style={{ marginBottom: '2rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fff', fontSize: '0.9rem', fontWeight: '600' }}>Message</label>
                                <textarea
                                    name="message"
                                    placeholder="e.g., Hi Ayush, I'd love to discuss a potential collaboration..."
                                    rows="5"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem',
                                        background: 'rgba(255,255,255,0.05)',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        color: 'white',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        resize: 'vertical',
                                        transition: 'border-color 0.3s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = 'white'}
                                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                style={{
                                    fontFamily: 'inherit',
                                    fontSize: '20px',
                                    background: 'white',
                                    color: 'black',
                                    padding: '0.7em 1em',
                                    paddingLeft: '0.9em',
                                    display: 'flex',
                                    alignItems: 'center',
                                    border: 'none',
                                    borderRadius: '16px',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s',
                                    cursor: 'pointer',
                                    width: '100%',
                                    justifyContent: 'center'
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.95)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <div className="svg-wrapper-1">
                                    <div className="svg-wrapper">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            width="24"
                                            height="24"
                                            style={{
                                                display: 'block',
                                                transformOrigin: 'center center',
                                                transition: 'transform 0.3s ease-in-out'
                                            }}
                                        >
                                            <path fill="none" d="M0 0h24v24H0z"></path>
                                            <path
                                                fill="currentColor"
                                                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <span style={{
                                    display: 'block',
                                    marginLeft: '0.3em',
                                    transition: 'all 0.3s ease-in-out'
                                }}>Send</span>
                            </button>
                            <style>{`
                                button:hover .svg-wrapper {
                                    animation: fly-1 0.6s ease-in-out infinite alternate;
                                }
                                button:hover svg {
                                    transform: translateX(1.2em) rotate(45deg) scale(1.1);
                                }
                                button:hover span {
                                    transform: translateX(5em);
                                }
                                @keyframes fly-1 {
                                    from {
                                        transform: translateY(0.1em);
                                    }
                                    to {
                                        transform: translateY(-0.1em);
                                    }
                                }
                            `}</style>
                        </form>
                    </motion.div>

                    <div style={{
                        marginTop: '4rem',
                        marginBottom: '4rem',
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <SocialLinks />
                    </div>

                    <div className="tech-line-blink" style={{ paddingTop: '2rem', textAlign: 'center' }}>
                        <p style={{ color: '#888', fontSize: '0.9rem' }}>© 2025 AYUSH RAJ. All Rights Reserved.</p>
                    </div>


                </div>
            </div>
        </section>
    );
};

export default Contact;

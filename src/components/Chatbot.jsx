import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { knowledgeBase, commonQuestions } from '../data/chatbotKnowledge';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            type: 'bot',
            text: "Hi, I'm Alex 👋\n\nI'm Ayush's AI assistant. I can help you with:\n• Knowing more about Ayush\n• Understanding his projects (PillBuddy, ScanTAPS, TANGO)\n• Getting info about collaborations\n• Navigating this website\n\nWhat would you like to know?"
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Enhanced smart response generator
    const generateResponse = (userMessage) => {
        const msg = userMessage.toLowerCase();

        // Greeting patterns
        if (msg.match(/^(hi|hello|hey|greetings|sup|yo|good morning|good afternoon|good evening)/)) {
            return "Hi there! 👋 I'm Alex, Ayush's AI assistant.\n\nI can help you learn about:\n• Ayush's background and skills\n• His projects (ScanTAPS, PillBuddy, TANGO)\n• How to work with or contact him\n• Navigating this portfolio\n\nWhat interests you most?";
        }

        // Who is Ayush / About questions
        if (msg.match(/(who is|tell me about|about|introduce) (ayush|him)/i) || msg === 'about' || msg.includes('who are you')) {
            return `Ayush Raj is a Computer Science student at Arizona State University with a perfect 4.0 GPA and a tech entrepreneur.\n\n**Quick highlights:**\n• 🎓 CS student at ASU (4.0 GPA)\n• 💻 Full-stack developer & AI/ML specialist\n• 🏆 Won Best Hardware Hack at SunHacks 2024\n• 🚀 Leading ScanTAPS (NFC campus tracking system)\n\n**Main skills:** React, Node.js, Python, Java, Machine Learning, IoT\n\nWould you like to:\n• See his full resume?\n• Learn about specific projects?\n• Know how to contact him?`;
        }

        // Contact / Collaboration questions
        if (msg.match(/(contact|email|reach|get in touch|work with|collaborate|hire|job|internship|opportunity)/)) {
            if (msg.includes('hire') || msg.includes('job') || msg.includes('internship') || msg.includes('work')) {
                return "Great! Ayush is open to opportunities. 🤝\n\n**To reach out:**\n• Use the contact form at the bottom of this page\n• Connect on LinkedIn\n• Check out his GitHub\n\n**What to include in your message:**\n• Your name and organization\n• Type of opportunity (internship, full-time, freelance, etc.)\n• Brief project/role description\n• Timeline and location preferences\n\nShall I scroll you to the contact form?";
            }
            return "You can reach Ayush through:\n• **Contact form** (scroll to bottom of page)\n• **LinkedIn** (professional inquiries)\n• **GitHub** (open source collaboration)\n\nIf you're interested in collaboration, internships, or projects, feel free to use the contact form with details about what you're looking for!";
        }

        // Projects - General
        if (msg.match(/(project|what has he built|show me|portfolio|work)/)) {
            if (msg.includes('scantaps')) {
                return `**ScanTAPS** - NFC Campus Tracking System 📱\n\n**What it is:**\nAn NFC + QR-powered campus-wide tagging system for ASU's Lost & Found automation.\n\n**Problem it solves:**\nHelps students quickly locate and recover lost items on campus using smart tagging technology.\n\n**How it works:**\n• Items are tagged with NFC/QR codes\n• Students scan to report found items\n• System tracks and notifies owners\n• Secure backend manages all data\n\n**Ayush's role:** Technical Lead\n**Tech stack:** Full-stack development, NFC integration, secure backend\n\nWant more technical details or see other projects?`;
            }
            if (msg.includes('pillbuddy')) {
                return `**PillBuddy** - IoT Medication Reminder 💊\n\n**What it is:**\nAn IoT-powered smart medication reminder system with hardware integration.\n\n**Problem it solves:**\nHelps people (especially elderly) remember to take medications on time, reducing health risks.\n\n**How it works:**\n• Smart hardware device with sensors\n• Automated reminders and alerts\n• Tracks medication adherence\n• Real-time notifications to caregivers\n\n**Achievement:** 🏆 Won **Best Hardware Hack** at SunHacks 2024!\n\n**Tech stack:** IoT, Hardware integration, HealthTech\n\nInterested in the technical implementation?`;
            }
            if (msg.includes('tango')) {
                return `**TANGO** - AI Research Project 🤖\n\n**What it is:**\nAn AI-powered research project focusing on advanced machine learning applications.\n\n**Tech stack:** AI, Machine Learning, Research methodologies\n\n**Status:** Active development (2024)\n\nWould you like to know about Ayush's other projects or his AI/ML expertise?`;
            }
            // General projects overview
            return `Ayush has built several impressive projects:\n\n**1. ScanTAPS** (Full Stack • NFC)\n• Campus-wide lost & found system\n• Role: Technical Lead\n• Status: Active deployment at ASU\n\n**2. PillBuddy** (HealthTech • IoT)\n• Smart medication reminder\n• 🏆 Won Best Hardware Hack (SunHacks 2024)\n\n**3. TANGO** (AI • Research)\n• Advanced ML research project\n\nWhich project would you like to explore in detail?`;
        }

        // Skills / Tech Stack questions
        if (msg.match(/(skill|technology|tech stack|programming|language|framework|what can he do|expertise)/)) {
            return `**Ayush's Technical Arsenal** 💻\n\n**Languages:**\n• JavaScript, Python, Java, HTML/CSS, MATLAB\n\n**Frameworks & Libraries:**\n• React, Node.js, Next.js, Three.js, Tailwind\n\n**Specializations:**\n• Full Stack Development\n• AI & Machine Learning\n• UI/UX Design\n• Cloud Architecture\n• IoT & Hardware Integration\n\n**Tools:** Git, Figma, Data Science tools\n\nLooking for expertise in a specific technology?`;
        }

        // Education / GPA questions
        if (msg.match(/(education|university|college|school|asu|arizona state|gpa|study|student|degree)/)) {
            return `**Education** 🎓\n\n**University:** Arizona State University (ASU)\n**Major:** Computer Science\n**GPA:** 4.0 (Perfect!)\n**Status:** Undergraduate student\n\n**Academic Excellence:**\nAyush maintains a perfect 4.0 GPA while:\n• Leading technical projects (ScanTAPS)\n• Winning hackathons (SunHacks 2024)\n• Working part-time at ASU\n• Building multiple startups\n\nImpressive balance of academics and real-world experience! 🌟\n\nWant to know about his work experience?`;
        }

        // Experience / Work questions
        if (msg.match(/(experience|work|job|role|position|employment|career)/)) {
            return `**Work Experience** 💼\n\n**Current Roles:**\n\n**1. Technical Lead - ScanTAPS**\n• ASU Lost & Found Automation System\n• Leading end-to-end development\n• Managing cross-functional teams\n• Period: 2024 - Present\n\n**2. Applicant Services Representative**\n• Arizona State University\n• Supporting prospective students\n• Managing admissions workflows\n• Period: 2025 - Present\n\n**Key Achievement:**\n🏆 Best Hardware Hack Winner - SunHacks 2024 (PillBuddy)\n\nWant details about a specific role or project?`;
        }

        // Achievements / Awards
        if (msg.match(/(achievement|award|win|won|hackathon|accomplishment|recognition)/)) {
            return `**Key Achievements** 🏆\n\n**🥇 Best Hardware Hack - SunHacks 2024**\n• Won with PillBuddy (IoT medication system)\n• Beat competing teams with innovative hardware integration\n\n**📚 Perfect 4.0 GPA**\n• Maintained throughout CS program at ASU\n• While building projects and working\n\n**🚀 Technical Leadership**\n• Leading ScanTAPS development\n• Managing cross-functional teams\n• Deployed campus-wide system\n\nThese achievements show Ayush's ability to excel in both academics and real-world projects!\n\nInterested in learning more about any specific achievement?`;
        }

        // Help / Navigation
        if (msg.match(/(help|navigate|where|find|show me|guide|how do i)/)) {
            return `**I can help you navigate!** 🧭\n\n**Main sections on this site:**\n• **About** - Ayush's background & expertise\n• **Skills** - Technical capabilities\n• **Projects** - ScanTAPS, PillBuddy, TANGO\n• **Experience** - Work history & roles\n• **Achievements** - Awards & recognition\n• **Contact** - Get in touch\n\n**What I can do for you:**\n• Explain any project in detail\n• Share Ayush's skills and experience\n• Help you contact or collaborate with him\n• Answer specific questions\n\nWhat would you like to explore?`;
        }

        // Resume / CV
        if (msg.match(/(resume|cv|curriculum vitae|download|pdf)/)) {
            return "I don't have a direct resume download link in my current knowledge base.\n\nHowever, this entire portfolio serves as Ayush's interactive resume! You can:\n• Scroll through all sections to see his full profile\n• Use the contact form to request a PDF resume\n• Connect on LinkedIn for his professional profile\n\nWould you like me to summarize his key qualifications?";
        }

        // Collaboration / Investment
        if (msg.match(/(invest|investor|funding|collaborate|partnership|startup|business)/)) {
            return `**Interested in collaboration or investment?** 🤝\n\nAyush is open to:\n• Technical collaborations\n• Startup partnerships\n• Research opportunities\n• Innovative projects\n\n**To discuss opportunities:**\n1. Use the contact form (scroll to bottom)\n2. Include in your message:\n   • Your name and organization\n   • Type of collaboration/investment\n   • Project scope or funding details\n   • Timeline and expectations\n\n**Current ventures:**\n• ScanTAPS (NFC campus system)\n• PillBuddy (HealthTech IoT)\n• TANGO (AI research)\n\nShall I guide you to the contact form?`;
        }

        // Thank you
        if (msg.match(/(thank|thanks|appreciate|helpful)/)) {
            return "You're very welcome! 😊\n\nI'm here anytime you need help learning about Ayush or his work.\n\nFeel free to:\n• Ask more questions\n• Explore the portfolio\n• Reach out via the contact form\n\nIs there anything else you'd like to know?";
        }

        // Default / Fallback
        return `I'm not fully sure about that based on the information I have. 🤔\n\n**I can help you with:**\n• Ayush's background and education (ASU, 4.0 GPA)\n• His projects (ScanTAPS, PillBuddy, TANGO)\n• Technical skills and expertise\n• Work experience and achievements\n• How to contact or collaborate with him\n\n**Try asking:**\n• "Tell me about Ayush"\n• "What projects has he built?"\n• "What are his skills?"\n• "How can I contact him?"\n\nOr use the contact form to ask Ayush directly!`;
    };

    const handleSend = () => {
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = { type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Simulate typing delay (more realistic)
        setTimeout(() => {
            const response = generateResponse(inputValue);
            setMessages(prev => [...prev, { type: 'bot', text: response }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const quickQuestions = [
        "Who is Ayush?",
        "Show me his projects",
        "What are his skills?",
        "How can I contact him?"
    ];

    return (
        <>
            {/* Chat Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    background: isOpen ? '#1a1a1a' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '24px',
                    padding: isOpen ? '0' : '8px',
                    overflow: 'hidden'
                }}
            >
                {isOpen ? (
                    '✕'
                ) : (
                    <img
                        src="/assets/alex-avatar.png"
                        alt="Alex"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%'
                        }}
                    />
                )}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: 'fixed',
                            bottom: '100px',
                            right: '30px',
                            width: '400px',
                            height: '600px',
                            background: '#1a1a1a',
                            borderRadius: '20px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                            zIndex: 999,
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            padding: '20px',
                            color: 'white'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    padding: '2px'
                                }}>
                                    <img
                                        src="/assets/alex-avatar.png"
                                        alt="Alex"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '50%'
                                        }}
                                    />
                                </div>
                                <div>
                                    <div style={{ fontWeight: '600', fontSize: '16px' }}>Alex</div>
                                    <div style={{ fontSize: '12px', opacity: 0.9 }}>AI Assistant • Always here to help</div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1,
                            overflowY: 'auto',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px'
                        }}>
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        alignSelf: msg.type === 'user' ? 'flex-end' : 'flex-start',
                                        maxWidth: '85%'
                                    }}
                                >
                                    <div style={{
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        background: msg.type === 'user'
                                            ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                            : 'rgba(255,255,255,0.05)',
                                        color: 'white',
                                        fontSize: '14px',
                                        lineHeight: '1.6',
                                        wordWrap: 'break-word',
                                        whiteSpace: 'pre-line'
                                    }}>
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{
                                        alignSelf: 'flex-start',
                                        padding: '12px 16px',
                                        borderRadius: '16px',
                                        background: 'rgba(255,255,255,0.05)',
                                        color: 'rgba(255,255,255,0.5)',
                                        fontSize: '14px'
                                    }}
                                >
                                    Alex is typing...
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Questions */}
                        {messages.length === 1 && (
                            <div style={{
                                padding: '0 20px 10px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '8px'
                            }}>
                                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginBottom: '4px' }}>
                                    Quick questions:
                                </div>
                                {quickQuestions.map((q, i) => (
                                    <motion.button
                                        key={i}
                                        whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => {
                                            setInputValue(q);
                                            setTimeout(() => handleSend(), 100);
                                        }}
                                        style={{
                                            padding: '10px 14px',
                                            borderRadius: '12px',
                                            background: 'rgba(255,255,255,0.05)',
                                            border: '1px solid rgba(255,255,255,0.1)',
                                            color: 'rgba(255,255,255,0.8)',
                                            fontSize: '13px',
                                            cursor: 'pointer',
                                            textAlign: 'left',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {q}
                                    </motion.button>
                                ))}
                            </div>
                        )}

                        {/* Input */}
                        <div style={{
                            padding: '20px',
                            borderTop: '1px solid rgba(255,255,255,0.1)',
                            display: 'flex',
                            gap: '10px'
                        }}>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Ask me anything..."
                                style={{
                                    flex: 1,
                                    padding: '12px 16px',
                                    borderRadius: '12px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: 'white',
                                    fontSize: '14px',
                                    outline: 'none'
                                }}
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSend}
                                disabled={!inputValue.trim()}
                                style={{
                                    padding: '12px 20px',
                                    borderRadius: '12px',
                                    background: inputValue.trim()
                                        ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                        : 'rgba(255,255,255,0.1)',
                                    border: 'none',
                                    color: 'white',
                                    cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
                                    fontWeight: '600',
                                    fontSize: '14px',
                                    opacity: inputValue.trim() ? 1 : 0.5
                                }}
                            >
                                Send
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Chatbot;

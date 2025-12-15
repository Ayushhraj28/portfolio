// Knowledge base for Alex chatbot
export const knowledgeBase = {
    personal: {
        name: "Ayush Raj",
        role: "Computer Science Student & Developer",
        university: "Arizona State University",
        gpa: "4.0",
        location: "Arizona, USA",
        bio: "I'm a Computer Science undergraduate at Arizona State University with a 4.0 GPA. I specialize in building high-performance web applications and AI-driven solutions.",
        expertise: ["Full Stack Development", "AI & Machine Learning", "UI/UX Design", "Cloud Architecture"]
    },

    contact: {
        email: "ayushraj@example.com",
        linkedin: "linkedin.com/in/ayushraj",
        github: "github.com/ayushraj",
        twitter: "@ayushraj"
    },

    projects: [
        {
            name: "ScanTAPS",
            category: "Full Stack • NFC Technology",
            description: "Leading the end-to-end development of ScanTAPS, an NFC + QR–powered campus-wide tagging system for ASU Lost & Found automation. Designed backend architecture, UI/UX flows, and secure item-tracking logic.",
            role: "Technical Lead",
            period: "2024 – Present",
            technologies: ["NFC", "QR Codes", "Full Stack", "Backend Architecture"],
            achievements: ["Campus-wide deployment", "Secure item tracking", "Cross-functional team coordination"]
        },
        {
            name: "PillBuddy",
            category: "HealthTech • IoT",
            description: "Best Hardware Hack winner at SunHacks 2024. Built an IoT-powered smart medication reminder system with hardware integration.",
            role: "Hackathon Winner",
            period: "2024",
            technologies: ["IoT", "Hardware", "HealthTech"],
            achievements: ["Won Best Hardware Hack at SunHacks 2024"]
        },
        {
            name: "TANGO",
            category: "AI • Research",
            description: "AI-powered research project focusing on advanced machine learning applications.",
            role: "Developer",
            period: "2024",
            technologies: ["AI", "Machine Learning", "Research"],
            achievements: ["Advanced ML implementation"]
        }
    ],

    experience: [
        {
            role: "Technical Lead — ScanTAPS",
            organization: "ASU Lost & Found Automation System",
            period: "2024 – Present",
            responsibilities: [
                "Leading end-to-end development of NFC + QR–powered campus-wide tagging system",
                "Designing backend architecture, UI/UX flows, and secure item-tracking logic",
                "Coordinating cross-functional teams for testing, deployment, and scalability"
            ]
        },
        {
            role: "Applicant Services Frontline Representative",
            organization: "Arizona State University",
            period: "2025 – Present",
            responsibilities: [
                "Delivering frontline support to prospective students and families",
                "Handling calls, inquiries, and admission guidance",
                "Managing data entry, student records, and communication workflows"
            ]
        },
        {
            role: "Hackathon Winner",
            organization: "SunHacks 2024",
            period: "2024",
            responsibilities: [
                "Won Best Hardware Hack with PillBuddy",
                "Built IoT-powered medication reminder system",
                "Integrated hardware and software components"
            ]
        }
    ],

    skills: {
        languages: ["HTML", "CSS", "JavaScript", "Python", "Java", "MATLAB"],
        frameworks: ["React", "Node.js", "Next.js", "Three.js", "Tailwind"],
        technologies: ["Machine Learning", "Data Science", "Web Dev", "Git", "Figma"],
        specializations: ["Full Stack Development", "AI & Machine Learning", "UI/UX Design", "Cloud Architecture"]
    },

    achievements: [
        {
            title: "Best Hardware Hack",
            event: "SunHacks 2024",
            description: "Won for PillBuddy - IoT medication reminder system"
        },
        {
            title: "4.0 GPA",
            event: "Arizona State University",
            description: "Maintaining perfect academic record in Computer Science"
        }
    ]
};

// Common questions and their responses
export const commonQuestions = {
    greeting: [
        "Hi! I'm Alex, Ayush's AI assistant. I can tell you about his projects, experience, skills, or anything else you'd like to know!",
        "Hello! I'm Alex. Feel free to ask me anything about Ayush's work, education, or projects!",
        "Hey there! I'm Alex, here to help you learn more about Ayush. What would you like to know?"
    ],

    about: [
        `Ayush Raj is a Computer Science student at Arizona State University with a perfect 4.0 GPA. He specializes in full-stack development, AI/ML, and building innovative solutions. He's currently leading the development of ScanTAPS, an NFC-powered campus tracking system.`,
        `Ayush is a passionate developer and CS student at ASU. He's won hackathons (Best Hardware Hack at SunHacks 2024), built multiple projects, and maintains a 4.0 GPA while working on cutting-edge tech.`
    ],

    contact: [
        "You can reach Ayush through the contact form on this website, or connect with him on LinkedIn and GitHub. Check out the Contact section below!",
        "The best way to get in touch is through the contact form at the bottom of this page. Ayush is also active on LinkedIn and GitHub!"
    ],

    projects: [
        "Ayush has worked on several impressive projects including ScanTAPS (NFC campus tracking), PillBuddy (IoT health tech - won Best Hardware Hack), and TANGO (AI research). Want to know more about any specific project?",
        "His main projects are ScanTAPS (campus-wide NFC system), PillBuddy (award-winning IoT medication reminder), and TANGO (AI research). Which one interests you?"
    ],

    skills: [
        "Ayush is proficient in JavaScript, Python, Java, React, Node.js, Machine Learning, and more. He specializes in full-stack development, AI/ML, UI/UX design, and cloud architecture.",
        "His tech stack includes React, Node.js, Python, Java, Next.js, Three.js, and various ML frameworks. He's a full-stack developer with strong AI/ML skills."
    ],

    education: [
        "Ayush is currently studying Computer Science at Arizona State University with a perfect 4.0 GPA.",
        "He's a CS undergraduate at ASU, maintaining a 4.0 GPA while working on multiple projects and gaining real-world experience."
    ]
};

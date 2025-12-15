import React, { useEffect } from 'react';
import './SocialTrapdoor.css';

const SocialTrapdoor = ({ platform, href, label, iconSrc }) => {
    useEffect(() => {
        if (platform === 'twitter') {
            const script = document.createElement('script');
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            script.charset = "utf-8";
            document.body.appendChild(script);
            return () => {
                try {
                    document.body.removeChild(script);
                } catch (e) {
                    // Ignore if already removed
                }
            };
        }
    }, [platform]);

    const style = iconSrc ? { '--door-icon': `url(${iconSrc})` } : {};
    const isImage = !!iconSrc;

    return (
        <div className={`trapdoor ${platform}`} style={style}>
            <div className={`top door ${isImage ? 'image-door' : 'font-door'}`}></div>
            <div className={`bottom door ${isImage ? 'image-door' : 'font-door'}`}></div>
            <a
                href={href}
                className="twitter-follow-button social-link"
                target="_blank"
                rel="noopener noreferrer"
            >
                {label}
            </a>
        </div>
    );
};

export default SocialTrapdoor;

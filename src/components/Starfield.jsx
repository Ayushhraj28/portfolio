import React, { useEffect, useRef } from 'react';

const Starfield = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        let width, height;
        let stars = [];




        const init = () => {
            // High DPI Support
            const dpr = window.devicePixelRatio || 1;
            width = window.innerWidth;
            height = window.innerHeight;

            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.scale(dpr, dpr);

            // Init Stars
            stars = [];
            for (let i = 0; i < 300; i++) {
                stars.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z: Math.random() * 2,
                    size: Math.random() * 1.5,
                    speed: Math.random() * 0.2 + 0.05 // Slower, more realistic drift
                });
            }


        };



        const animate = () => {
            // Clear with void color
            ctx.fillStyle = '#030305';
            ctx.fillRect(0, 0, width, height);



            // Draw Stars
            stars.forEach(star => {
                star.y += star.speed;
                if (star.y > height) {
                    star.y = 0;
                    star.x = Math.random() * width;
                }

                const depthAlpha = 1 - (star.z / 2.5);
                ctx.fillStyle = `rgba(255, 255, 255, ${depthAlpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                // Constellations
                stars.forEach(otherStar => {
                    const dx = star.x - otherStar.x;
                    const dy = star.y - otherStar.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 60 && depthAlpha > 0.6) {
                        ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 - (dist / 1200)})`;
                        ctx.lineWidth = 0.3;
                        ctx.beginPath();
                        ctx.moveTo(star.x, star.y);
                        ctx.lineTo(otherStar.x, otherStar.y);
                        ctx.stroke();
                    }
                });
            });



            requestAnimationFrame(animate);
        };

        init();
        animate();

        const handleResize = () => {
            init();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: -1,
                pointerEvents: 'none',
                background: '#030305' // Fallback
            }}
        />
    );
};

export default Starfield;

import React, { useState, useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@mediapipe/hands';

const Hero = () => {
    const [isTracking, setIsTracking] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [permissionDenied, setPermissionDenied] = useState(false);
    const videoRef = useRef(null);
    const requestRef = useRef(null);
    const modelRef = useRef(null);
    const handModelRef = useRef(null);
    const lastScrollTime = useRef(0);

    const scrollDirection = useRef(0); // 0: None, 1: Down, -1: Up
    const scrollVelocity = useRef(0);
    const scrollRaf = useRef(null);

    // Smooth Scroll Loop (Runs at 60fps independent of detection rate)
    const smoothScrollLoop = () => {
        const targetSpeed = scrollDirection.current * 25; // Target speed (pixels per frame)

        // Linear Interpolation (Lerp) for smooth acceleration/deceleration
        // velocity += (target - velocity) * friction
        scrollVelocity.current += (targetSpeed - scrollVelocity.current) * 0.1;

        // Apply scroll if velocity is significant
        if (Math.abs(scrollVelocity.current) > 0.1) {
            window.scrollBy(0, scrollVelocity.current);
        }

        if (isTracking) {
            scrollRaf.current = requestAnimationFrame(smoothScrollLoop);
        }
    };

    const startTracking = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setPermissionDenied(false);

        // Safety timeout to prevent infinite loading state
        const safetyTimeout = setTimeout(() => {
            if (isLoading) {
                console.error("Initialization timed out.");
                setIsLoading(false);
                alert("Initialization took too long. Please refresh and try again.");
            }
        }, 30000); // 30 seconds max

        try {
            console.log("Initializing TensorFlow...");

            // Wait for TF to be ready
            await tf.ready();

            // Only set backend if not already set (optional optimization)
            if (tf.getBackend() !== 'webgl') {
                await tf.setBackend('webgl');
            }

            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (videoRef.current) {
                // Define handler first
                let isInit = false;
                const onVideoReady = async () => {
                    if (isInit) return; // Prevent double initialization
                    isInit = true;

                    try {
                        // Load Face Model
                        const loadFaceModelPromise = faceLandmarksDetection.createDetector(
                            faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
                            {
                                runtime: 'tfjs',
                                maxFaces: 1,
                            }
                        );

                        // Load Hand Model
                        const loadHandModelPromise = handPoseDetection.createDetector(
                            handPoseDetection.SupportedModels.MediaPipeHands,
                            {
                                runtime: 'tfjs',
                                modelType: 'lite', // Use lite for performance
                                maxHands: 1
                            }
                        );

                        const timeoutPromise = new Promise((_, reject) =>
                            setTimeout(() => reject(new Error("Model load timeout")), 25000)
                        );

                        const [faceModel, handModel] = await Promise.race([
                            Promise.all([loadFaceModelPromise, loadHandModelPromise]),
                            timeoutPromise
                        ]);

                        modelRef.current = faceModel;
                        handModelRef.current = handModel;

                        clearTimeout(safetyTimeout);
                        setIsLoading(false);
                        setIsTracking(true);

                        // Loops are triggered by useEffect when isTracking becomes true

                    } catch (modelErr) {
                        console.error("Model loading failed:", modelErr);
                        clearTimeout(safetyTimeout);
                        setIsLoading(false);
                        alert("AI Models failed to load. Please refresh or try again.");
                    }
                };

                // Attach listener BEFORE setting source
                videoRef.current.onloadeddata = onVideoReady;
                videoRef.current.srcObject = stream;

                // Force play
                videoRef.current.play().catch(e => console.error("Play error:", e));

                // Check if already ready (race condition safety)
                if (videoRef.current.readyState >= 2) {
                    onVideoReady();
                }
            }
        } catch (err) {
            console.error("Error accessing webcam or initializing:", err);
            clearTimeout(safetyTimeout);
            setPermissionDenied(true);
            setIsLoading(false);
        }
    };

    const stopTracking = () => {
        setIsTracking(false);
        if (videoRef.current && videoRef.current.srcObject) {
            videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        if (requestRef.current) {
            cancelAnimationFrame(requestRef.current);
        }
        if (scrollRaf.current) {
            cancelAnimationFrame(scrollRaf.current);
        }
        // Reset velocity
        scrollDirection.current = 0;
        scrollVelocity.current = 0;
    };

    const detectLoop = async () => {
        // Note: isTracking might be stale in the closure if not careful, 
        // but since we cancel/restart in useEffect, it should be fine.
        // We also check videoRef and models.

        // Double check tracking state via ref if needed, but for now relying on cancellation.
        // Actually, let's trust the loop lifecycle managed by useEffect.
        if (!videoRef.current || !modelRef.current || !handModelRef.current) return;

        try {
            // Check video dimensions
            if (videoRef.current.videoWidth === 0) {
                requestRef.current = requestAnimationFrame(detectLoop);
                return;
            }

            // Run detections in parallel
            const [facePredictions, handPredictions] = await Promise.all([
                modelRef.current.estimateFaces(videoRef.current),
                handModelRef.current.estimateHands(videoRef.current)
            ]);

            // --- Face Logic ---
            if (facePredictions.length > 0) {
                const keypoints = facePredictions[0].keypoints;
                const noseTip = keypoints[1];

                if (noseTip) {
                    // Mirror X axis
                    let x = 1 - (noseTip.x / videoRef.current.videoWidth);
                    let y = noseTip.y / videoRef.current.videoHeight;

                    // Sensitivity and Calibration
                    const sensitivity = 6;
                    const yOffset = 0.05;

                    x = (x - 0.5) * sensitivity + 0.5;
                    y = (y - 0.5 - yOffset) * sensitivity + 0.5;

                    const clientX = x * window.innerWidth;
                    const clientY = y * window.innerHeight;

                    // Dispatch events
                    const eventProps = {
                        view: window,
                        bubbles: true,
                        cancelable: true,
                        composed: true,
                        clientX: clientX,
                        clientY: clientY,
                        screenX: clientX,
                        screenY: clientY,
                        buttons: 0,
                    };

                    const mouseEvent = new MouseEvent('mousemove', eventProps);
                    const pointerEvent = new PointerEvent('pointermove', {
                        ...eventProps,
                        pointerId: 1,
                        pointerType: 'mouse',
                        isPrimary: true,
                        width: 1,
                        height: 1,
                        pressure: 0
                    });

                    window.dispatchEvent(mouseEvent);
                    window.dispatchEvent(pointerEvent);

                    document.dispatchEvent(mouseEvent);
                    document.dispatchEvent(pointerEvent);

                    const canvases = document.querySelectorAll('canvas');
                    canvases.forEach(canvas => {
                        canvas.dispatchEvent(mouseEvent);
                        canvas.dispatchEvent(pointerEvent);
                    });
                }
            }

            // --- Hand Gesture Logic ---
            let detectedDirection = 0; // Default to no scroll

            if (handPredictions.length > 0) {
                const hand = handPredictions[0];

                // Debug: Log score
                if (Math.random() < 0.05) console.log("Hand Score:", hand.score);

                // Only process gestures if confidence is high enough
                if (!hand.score || hand.score >= 0.65) {
                    const keypoints = hand.keypoints;

                    // Helper to get distance between two points
                    const getDist = (p1, p2) => {
                        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
                    };

                    const wrist = keypoints[0];

                    // Thumb
                    const thumbTip = keypoints[4];
                    const thumbIp = keypoints[3];

                    // Finger Tips
                    const indexTip = keypoints[8];
                    const middleTip = keypoints[12];
                    const ringTip = keypoints[16];
                    const pinkyTip = keypoints[20];

                    // Finger MCPs (Knuckles) - Base of finger
                    const indexMcp = keypoints[5];
                    const middleMcp = keypoints[9];
                    const ringMcp = keypoints[13];
                    const pinkyMcp = keypoints[17];
                    const thumbMcp = keypoints[2];

                    // Finger PIPs (Joint below tip)
                    const indexPip = keypoints[6];
                    const middlePip = keypoints[10];
                    const ringPip = keypoints[14];
                    const pinkyPip = keypoints[18];

                    // Helper: Check if finger is extended using Tip vs PIP distance to Wrist
                    // If Tip is further from Wrist than PIP, it's extended.
                    // We add a small buffer to be sure.
                    const isFingerExtended = (tip, pip) => {
                        return getDist(tip, wrist) > getDist(pip, wrist) * 1.2;
                    };

                    const isFingerCurled = (tip, pip) => {
                        return getDist(tip, wrist) < getDist(pip, wrist) * 1.1;
                    };

                    // --- Fist Gesture (Stop) ---
                    // All fingers curled.

                    const indexCurled = isFingerCurled(indexTip, indexPip);
                    const middleCurled = isFingerCurled(middleTip, middlePip);
                    const ringCurled = isFingerCurled(ringTip, ringPip);
                    const pinkyCurled = isFingerCurled(pinkyTip, pinkyPip);

                    // Check thumb too for Fist (optional but good)
                    // For thumb, check if Tip is close to MCP or IP
                    const thumbCurled = getDist(thumbTip, wrist) < getDist(thumbMcp, wrist) * 1.2;

                    if (indexCurled && middleCurled && ringCurled && pinkyCurled && thumbCurled) {
                        console.log("Fist detected! Stopping...");
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        stopTracking();
                        return;
                    }

                    // --- Scroll Gestures ---
                    // Index, Middle MUST be Extended.
                    // Ring, Pinky should be Curled (or at least NOT extended).

                    const indexExt = isFingerExtended(indexTip, indexPip);
                    const middleExt = isFingerExtended(middleTip, middlePip);

                    // We relax the Ring/Pinky check. Just ensure they are NOT extended.
                    // This handles the "half-curled" case better.
                    const ringNotExt = !isFingerExtended(ringTip, ringPip);
                    const pinkyNotExt = !isFingerExtended(pinkyTip, pinkyPip);

                    if (indexExt && middleExt && ringNotExt && pinkyNotExt) {
                        // Determine direction using Y coordinates
                        const isIndexDown = indexTip.y > indexPip.y;
                        const isMiddleDown = middleTip.y > middlePip.y;

                        const isIndexUp = indexTip.y < indexPip.y;
                        const isMiddleUp = middleTip.y < middlePip.y;

                        if (isIndexDown && isMiddleDown) {
                            detectedDirection = 1; // Scroll Down
                        } else if (isIndexUp && isMiddleUp) {
                            detectedDirection = -1; // Scroll Up
                        }
                    }
                }
            }

            // Update the ref for the smooth loop to read
            scrollDirection.current = detectedDirection;

        } catch (err) {
            console.error("Detection error:", err);
        }

        // Keep loop running if tracking is active
        // We check the ref to see if we should continue, 
        // but mostly we rely on useEffect to cancel this frame if isTracking becomes false.
        // However, since this is async, isTracking might have changed.
        // Let's pass isTracking as a dependency to useEffect to restart the loop, 
        // so here we just schedule next frame.
        requestRef.current = requestAnimationFrame(detectLoop);
    };

    useEffect(() => {
        if (isTracking) {
            detectLoop();
            smoothScrollLoop();
        } else {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (scrollRaf.current) {
                cancelAnimationFrame(scrollRaf.current);
            }
        }
        return () => {
            if (requestRef.current) {
                cancelAnimationFrame(requestRef.current);
            }
            if (scrollRaf.current) {
                cancelAnimationFrame(scrollRaf.current);
            }
        };
    }, [isTracking]);

    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        if (isTracking && !isLoading) {
            setShowInstructions(true);
            const timer = setTimeout(() => setShowInstructions(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [isTracking, isLoading]);

    return (
        <section
            id="home"
            className="hero-section"
            style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
        >
            {/* Hidden Video Element for Tracking - Must be visible to DOM for TF.js to read frames */}
            <video
                ref={videoRef}
                width="640"
                height="480"
                style={{
                    position: 'absolute',
                    width: '640px',
                    height: '480px',
                    opacity: 0, // Hidden but active
                    pointerEvents: 'none',
                    zIndex: -1,
                    transform: 'scaleX(-1)'
                }}
                autoPlay
                playsInline
                muted
            />

            {/* Instructions Popup */}
            <motion.div
                initial={{ opacity: 0, y: -20, x: 20 }}
                animate={{ opacity: showInstructions ? 1 : 0, y: showInstructions ? 0 : -20 }}
                transition={{ duration: 0.5 }}
                style={{
                    position: 'absolute',
                    top: '140px',
                    right: '20px',
                    zIndex: 99,
                    background: 'rgba(0, 0, 0, 0.8)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    borderRadius: '12px',
                    padding: '15px',
                    color: 'white',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.9rem',
                    backdropFilter: 'blur(10px)',
                    pointerEvents: 'none',
                    maxWidth: '250px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
                }}
            >
                <div style={{ color: '#22c55e', fontWeight: 'bold', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', textShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }}>
                    <span style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', display: 'block', boxShadow: '0 0 8px #22c55e' }}></span>
                    Systems Online
                </div>
                <ul style={{
                    listStyle: 'disc',
                    paddingLeft: '20px',
                    margin: 0,
                    opacity: 1,
                    lineHeight: '1.8',
                    color: 'white',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.6)' // White light glow
                }}>
                    <li>Head controls robot view</li>
                    <li>Two fingers down to scroll</li>
                    <li>Two fingers up to scroll up</li>
                    <li>Closed fist to stop</li>
                </ul>
            </motion.div>


            <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: isLoading ? 1 : 1.1 }}
                whileTap={{ scale: isLoading ? 1 : 0.9 }}
                onClick={() => {
                    if (isLoading) return;
                    if (isTracking) {
                        stopTracking();
                    } else {
                        startTracking();
                    }
                }}
                style={{
                    position: 'absolute',
                    top: '80px',
                    right: '20px',
                    zIndex: 100,
                    background: 'transparent',
                    border: isTracking ? '1px solid #22c55e' : '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: isTracking ? '0 0 15px rgba(34, 197, 94, 0.5)' : '0 0 10px rgba(255, 255, 255, 0.3)',
                    borderRadius: '50px',
                    padding: '10px 20px',
                    color: 'white',
                    cursor: isLoading ? 'wait' : 'pointer',
                    backdropFilter: 'blur(5px)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.85rem',
                    letterSpacing: '0.5px',
                    opacity: isLoading ? 0.7 : 1,
                    pointerEvents: isLoading ? 'none' : 'auto',
                    transition: 'all 0.3s ease'
                }}
            >
                {isLoading ? (
                    <span>Initializing...</span>
                ) : (
                    <>
                        <span style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            background: isTracking ? '#22c55e' : (permissionDenied ? '#ef4444' : '#888'),
                            boxShadow: isTracking ? '0 0 8px #22c55e' : 'none'
                        }}></span>
                        {isTracking ? "Gesture Control Active" : "Enable Gesture Control"}
                    </>
                )}
            </motion.button>


            <div className="container" style={{ position: 'relative', zIndex: 2, width: '100%', pointerEvents: 'none' }}>
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.2,
                                delayChildren: 0.3
                            }
                        }
                    }}
                >
                    <motion.h5
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { duration: 1.5, ease: "easeOut" } }
                        }}
                        style={{ marginBottom: '1rem', letterSpacing: '0.2em', color: '#888' }}
                    >
                        Hi this is
                    </motion.h5>

                    <motion.h1
                        variants={{
                            hidden: { opacity: 0, y: 50 },
                            visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                        }}
                        style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', fontWeight: '700', lineHeight: '0.9', marginBottom: '2rem', color: 'white' }}
                    >
                        AYUSH<br />RAJ
                    </motion.h1>

                    <motion.a
                        href="#works"
                        className="btn-circle"
                        variants={{
                            hidden: { opacity: 0, scale: 0.8 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
                        }}
                        whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
                        whileTap={{ scale: 0.9 }}
                        style={{ marginTop: '2rem', borderColor: 'rgba(255,255,255,0.2)', pointerEvents: 'auto' }}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(45deg)' }}>
                            <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.a>
                </motion.div>
            </div>

            {/* Spline Background */}
            <div style={{ position: 'absolute', inset: 0, zIndex: 1, filter: 'brightness(1.2) contrast(1.1) grayscale(100%)' }}>
                <Spline
                    scene="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
                />
            </div>

            {/* Dark Overlay for blending */}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,5,0.9) 0%, rgba(5,5,5,0) 50%)', zIndex: 1, pointerEvents: 'none' }}></div>
        </section>
    );
};

export default Hero;

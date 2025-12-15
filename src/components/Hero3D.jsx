import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const NeuralParticles = (props) => {
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;

        // Mouse interaction: subtle tilt based on mouse position
        const x = (state.mouse.x * window.innerWidth) / 50;
        const y = (state.mouse.y * window.innerHeight) / 50;
        ref.current.rotation.x += (state.mouse.y * 0.5 - ref.current.rotation.x) * delta;
        ref.current.rotation.y += (state.mouse.x * 0.5 - ref.current.rotation.y) * delta;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color="#000000"
                    size={0.005}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
};

const NeuralConnections = () => {
    // A secondary layer of larger, connected nodes for the "Network" feel
    const ref = useRef();
    const sphere = useMemo(() => random.inSphere(new Float32Array(300), { radius: 1.2 }), []);

    useFrame((state, delta) => {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
        ref.current.rotation.x += (state.mouse.y * 0.5 - ref.current.rotation.x) * delta;
        ref.current.rotation.y += (state.mouse.x * 0.5 - ref.current.rotation.y) * delta;
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#000000"
                    size={0.02}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

const Hero3D = () => {
    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas camera={{ position: [0, 0, 3] }}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <NeuralParticles />
                    <NeuralConnections />
                </Float>
            </Canvas>
        </div>
    );
};

export default Hero3D;

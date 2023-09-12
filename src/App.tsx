import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box(props: { position: [number, number, number] }) {
    // This reference gives us direct access to the THREE.Mesh object
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ref = useRef<any>();
    // Hold state for hovered and clicked events
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_, delta) => (ref.current.rotation.x += delta));
    // Return the view, these are regular Threejs elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={ref}
            scale={clicked ? 1.5 : 1}
            onClick={(event) => (event.stopPropagation(), click(!clicked))}
            onPointerOver={(event) => (event.stopPropagation(), hover(true))}
            onPointerOut={() => hover(false)}
        >
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    );
}

export default function App() {
    return (
        <>
            <h1>{'Hello Vite + React!'}</h1>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Box position={[-1.2, 0, 0]} />
                <Box position={[1.2, 0, 0]} />
                <OrbitControls />
            </Canvas>
        </>
    );
}

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { Suspense } from "react";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

function ThreeScene() {
    const mtl = useLoader(MTLLoader, "/tree.mtl");
    const obj = useLoader(OBJLoader, "/tree.obj", (loader) => {
        // Указываем ссылку на объект для загрузки материалов
        loader.setMaterials(mtl);
    });

    return (
        <>
            <Suspense fallback={null}>
                <Canvas>
                    <directionalLight
                        position={[5, 5, 5]}
                        intensity={2}
                        castShadow
                        shadow-mapSize-width={1024}
                        shadow-mapSize-height={1024}
                        shadow-camera-far={50}
                        shadow-camera-left={-10}
                        shadow-camera-right={10}
                        shadow-camera-top={10}
                        shadow-camera-bottom={-10}
                    />
                    <mesh castShadow={true}>
                        <primitive castShadow={true} object={obj} scale={1} />
                    </mesh>
                    <mesh
                        receiveShadow
                        rotation={[-Math.PI / 2, 0, 0]}
                        position={[1, 0, -1]}
                    >
                        <boxGeometry args={[50, 50, 1]} />
                        <meshStandardMaterial color={"rgb(56, 229, 56)"} />
                    </mesh>

                    <color attach={"background"} args={["skyblue"]} />
                    <OrbitControls
                        attachArray={undefined}
                        attachObject={undefined}
                    />
                </Canvas>
            </Suspense>
        </>
    );
}

export default ThreeScene;

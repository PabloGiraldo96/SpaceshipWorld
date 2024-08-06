import { Canvas } from "@react-three/fiber";
import "./App.css";
import { KeyboardControls, OrbitControls } from "@react-three/drei";
//import { SpaceshipScene } from "./components/SpaceshipScene";
import { MixedScenes } from "./components/MixedScenes";
import { Physics } from "@react-three/rapier";
import { Experience } from "./components/Experience";
import { Suspense, useRef } from "react";
import { useControls } from "./components/UseControls";

//export const Controls = {
//  forward: "forward",
//  back: "back",
//  left: "left",
//  right: "right",
//  jump: "jump",
//};

function App() {
  const map = [
    {
      name: "forward",
      keys: ["ArrowUp", "KeyW"],
    },
    {
      name: "back",
      keys: ["ArrowDown", "KeyS"],
    },
    {
      name: "left",
      keys: ["ArrowLeft", "KeyA"],
    },
    {
      name: "right",
      keys: ["ArrowRight", "KeyD"],
    },
    {
      name: "jump",
      keys: ["Space"],
    },
  ];

  const spaceshipRef = useRef();
  const controls = useControls();

  return (
    <KeyboardControls map={map}>
      <Canvas shadows camera={{ fov: 37 }}>
        <OrbitControls />
        <Suspense fallback={null}>
          <Physics gravity={[0, -0.3, 0]}>
            <Experience />
            {/*<SpaceshipScene />*/}
            <MixedScenes controls={controls} spaceshipRef={spaceshipRef} />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;

/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// Fondo negro puro: las estrellas son lo único que se ve en el cielo.
export const NIGHT_COLOR = "#000000";

// ---- Pulso del cielo (mismas constantes que la versión Vue/Tres)
const PULSE_PERIOD = 2.5; // segundos entre pulsos
const PULSE_AMP = 0.010; // cuánto crece la esfera en el pico (0.08 = +8 %, 5 = x6)
const PULSE_ATTACK = 0.2; // fracción del ciclo que dura la subida
// Deriva lenta: sin ella, escalar una esfera centrada en la cámara solo cambia el tamaño
// aparente de los puntos, no su posición. Con rotación las estrellas se desplazan de verdad.
const DRIFT_SPEED = 0.012; // rad/s

// Estrellas: radio 400 + profundidad 80 => con el pulso máximo (x6) llegan a ~2900 < far (4000)
const STARS = { radius: 300, depth: 80, count: 30000, factor: 6 };

// Pulso 0 -> 1 -> 0 dentro de cada periodo (sube en `attack`, baja el resto), suave en los extremos
function pulse(t) {
  const phase = (t % PULSE_PERIOD) / PULSE_PERIOD;
  if (phase < PULSE_ATTACK) return Math.sin((phase / PULSE_ATTACK) * (Math.PI / 2));
  return Math.cos(((phase - PULSE_ATTACK) / (1 - PULSE_ATTACK)) * (Math.PI / 2));
}

// Farolas del mapa original (x, altura de la lámpara, z)
const LAMPS = [
  [105.4, 64, -4.6],
  [-47.0, 40, -108.1],
  [61.3, 85, 3.3],
  [-34.4, 76, 4.9],
  [-78.3, 64, -3.5],
];

// lamps: farolas [x, y, z]; worldScale: tamaño del mundo respecto al mapa grande (ver SMALL_SHIP)
export const Experience = ({ worldScale = 1, lamps = LAMPS }) => {
  const k = worldScale;
  const follow = useRef(); // sigue a la cámara (así nunca se llega al borde del cielo)
  const stars = useRef(); // pulso + deriva

  useFrame(({ camera, clock }) => {
    if (follow.current) follow.current.position.copy(camera.position);
    if (stars.current) {
      const t = clock.elapsedTime;
      stars.current.scale.setScalar(1 + PULSE_AMP * pulse(t));
      stars.current.rotation.y = t * DRIFT_SPEED;
      stars.current.rotation.x = t * DRIFT_SPEED * 0.4;
    }
  });

  return (
    <>
      <color attach="background" args={[NIGHT_COLOR]} />
      <fog attach="fog" args={[NIGHT_COLOR, 80 * k, 1150 * k]} />

      <ambientLight intensity={0.28} color="#5468a8" />
      <hemisphereLight args={["#2f4278", "#2a1608", 0.45]} />
      <directionalLight position={[-300, 500, 250]} intensity={0.85} color="#a9bcff" />

      <group ref={follow}>
        <group ref={stars}>
          <Stars {...STARS} saturation={0} fade speed={1} />
        </group>
      </group>

      {lamps.map(([x, y, z], i) => (
        <pointLight
          key={i}
          position={[x, y, z]}
          color="#ffa23a"
          intensity={3500 * k * k}
          distance={15000 * k}
          decay={1.7}
        />
      ))}
    </>
  );
};
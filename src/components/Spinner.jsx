import "../assets/styles/Loading.css";
import { Html } from "@react-three/drei";

export const Spinner = () => {
  return (
    <Html>
      <div className="lds-ripple">
        <div></div>
      </div>
    </Html>
  );
};

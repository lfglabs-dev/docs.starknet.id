import { FunctionComponent } from "react";
import Encoder from "./encoder";
import styles from "../styles/decoder.module.css";

const Playground: FunctionComponent = () => {
  return (
    <div className={styles.playground}>
      <Encoder type="encode" />
      <Encoder type="decode" />
    </div>
  );
};

export default Playground;

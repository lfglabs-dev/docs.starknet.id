import { useEffect, useState } from "react";
import styles from "../styles/decoder.module.css";
import { utils } from "starknetid.js";

const Decoder = () => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<string>("");

  const onTypingEnd = () => {
    try {
      const bigint = domain.split(",").map((x) => BigInt(x));
      const encoded = utils.decodeDomain(bigint);
      setResult(encoded.toString());
    } catch {
      const decoded = utils.encodeDomain(domain);
      setResult(decoded.toString());
    }
  };

  return (
    <div className={styles.container}>
      {result && <div className={styles.result}>{result}</div>}
      <input
        type="text"
        className={styles.decoder}
        placeholder="Encode/Decode domain"
        value={domain}
        onChange={(e) => setDomain(e.target.value)}
        onKeyUp={onTypingEnd}
      />
    </div>
  );
};

export default Decoder;

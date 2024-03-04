import { FunctionComponent, useState } from "react";
import styles from "../styles/decoder.module.css";
import { utils } from "starknetid.js";

type EncoderProps = {
  type: "encode" | "decode";
};

const Encoder: FunctionComponent<EncoderProps> = ({ type }) => {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState<string>("");
  const [copied, setCopied] = useState(false);

  const onTypingEnd = () => {
    if (domain === "") {
      setResult("");
      return;
    }
    if (type === "encode") {
      const decoded = utils.encodeDomain(domain);
      setResult(decoded.toString());
      // Copy to clipboard
      navigator.clipboard.writeText(decoded.toString());
      setCopied(true);
    } else {
      try {
        const bigint = domain.split(",").map((x) => BigInt(x));
        const encoded = utils.decodeDomain(bigint);
        setResult(encoded.toString());
        // Copy to clipboard
        navigator.clipboard.writeText(encoded.toString());
        setCopied(true);
      } catch {
        setResult(
          "Invalid input. Please enter a comma-separated list of integers."
        );
      }
    }
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {type === "encode" ? "Encode" : "Decode"} Domain
      </h2>
      <p className={styles.example}>
        {type === "encode" ? "e.g. nicolas.stark" : "e.g. 54220562821"}
      </p>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.encoder}
          placeholder={`${
            type === "encode"
              ? "Provide a domain"
              : "Provide an integer or a list of integers"
          }`}
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          onKeyUp={onTypingEnd}
        />
        {copied && <div className={styles.copied}>Copied</div>}
      </div>
      {result && <div className={styles.result}>{result}</div>}
    </div>
  );
};

export default Encoder;

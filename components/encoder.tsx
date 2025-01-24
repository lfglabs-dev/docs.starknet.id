import { FunctionComponent, useState } from "react";
import styles from "../styles/decoder.module.css";
import { utils } from "starknetid.js";
import { basicAlphabet } from "utils/constants";

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
      if (domain.endsWith("."))
        return setResult("Domain cannot end with a dot.");
      if (
        !utils.isStarkRootDomain(
          domain.endsWith(".stark") ? domain : domain + ".stark"
        )
      )
        return setResult("Invalid characters in domain.");
      const decoded = utils.encodeDomain(domain);
      setResult(decoded.toString());
    } else {
      try {
        const bigint = domain.split(",").map((x) => BigInt(x));
        if (bigint.some((x) => x <= 0))
          return setResult("Cannot decode negative or zero integers.");
        const encoded = utils.decodeDomain(bigint);
        setResult(encoded.toString());
      } catch {
        setResult(
          "Invalid input. Please enter a comma-separated list of integers."
        );
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
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
      {result && (
        <div className={styles.resultContainer}>
          <div className={styles.result}>{result}</div>{" "}
          <div onClick={copyToClipboard} className={styles.copy}>
            {copied ? "Copied!" : "Copy"}
          </div>
        </div>
      )}
    </div>
  );
};

export default Encoder;

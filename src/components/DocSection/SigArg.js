import React from "react";
import styles from "./SigArg.module.css";

export const SigArg = ({ name, default: argDefault }) => {
  return (
    <div className={styles.sigarg}>
      <strong>{name}</strong>&nbsp;
      <span className={styles.default}>default: {argDefault}</span>
    </div>
  );
};

export default SigArg;

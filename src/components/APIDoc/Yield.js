import React from "react";
import styles from "./APIDoc.module.css";

export const Yield = ({ line }) => {
  const parts = line.split(":");
  return parts.length > 1 ? (
    <div className={styles.parameter}>
      <span className={styles.name}>{parts[0]}</span>&nbsp;
      <span className={styles.type}>{parts[1]}</span>
    </div>
  ) : (
    <div class={styles.text}>{parts[0]}</div>
  );
};

export default Yield;

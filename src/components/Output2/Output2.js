import React from "react";
import styles from "./Output2.module.css";

export const Output2 = ({ children }) => (
  <div className={styles.output2}>
    <div className={styles.label}>Output</div>
    <div>{children}</div>
  </div>
);

export default Output2;

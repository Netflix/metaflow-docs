import React from "react";
import styles from "./Output.module.css";

export const Output = ({ children }) => (
  <div className={styles.output}>{children}</div>
);

export default Output;

import React from "react";
import styles from "./APIDoc.module.css";

export const Description = ({ text }) => (
  <div className={styles.text}>{text}</div>
);

export default Description;

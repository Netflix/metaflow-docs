import React from "react";
import styles from "./APIDoc.module.css";

export const NameType = ({ name, type }) => (
  <>
    <span className={styles.name}>{name}</span>&nbsp;
    <span className={styles.type}>{type}</span>
  </>
);

export default NameType;

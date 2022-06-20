import React from "react";
import styles from "./ParamSection.module.css";

export const ParamSection = ({ name, children }) => (
  <div className={styles.wrapper}>
    <div className={styles.paramSectionName}>
      <strong>{name}&nbsp;</strong>
    </div>
    <div className={styles.paramSectionChildren}>{children}</div>
  </div>
);

export default ParamSection;

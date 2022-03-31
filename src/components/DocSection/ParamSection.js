import React from "react";
import styles from "./ParamSection.module.css";

export const ParamSection = ({ name, children }) => (
  <div className={styles.wrapper}>
    <div>
      <strong>{name}:&nbsp;</strong>
    </div>
    <div>{children}</div>
  </div>
);

export default ParamSection;

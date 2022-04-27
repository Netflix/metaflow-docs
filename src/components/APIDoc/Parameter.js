import React from "react";
import styles from "./APIDoc.module.css";
import NameType from "./NameType";
import Description from "./Description";

export const Parameter = ({ line }) => {
  const parts = line.split(":");
  return parts.length > 1 ? (
    <div className={styles.parameter}>
      <NameType name={parts[0]} type={parts[1]} />
    </div>
  ) : (
    <Description text={parts[0]} />
  );
};

export default Parameter;

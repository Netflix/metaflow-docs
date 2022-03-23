import React from "react";
import styles from "./APIDoc.module.css";
import { TypeDescription } from "./TypeDescription";
import NameType from "./NameType";

export const Return = ({ line }) => {
  const parts = line.split(":");
  return parts.length > 1 ? (
    <div className={styles.parameter}>
      <NameType name={parts[0]} type={parts[1]} />
    </div>
  ) : (
    <TypeDescription
      type={line.split(" ")[0]}
      description={line.substr(line.indexOf(" ") + 1)}
    />
  );
};

export default Return;

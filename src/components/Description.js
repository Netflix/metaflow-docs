import React from "react";
import styles from "./Description.module.css";

/**
 * Shows a description of a page
 * @param children The text to show in the description
 */
export const Description = ({ children }) => (
  <div className={styles.description}>{children}</div>
);

export default Description;

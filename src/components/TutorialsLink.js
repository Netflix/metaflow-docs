import React from "react";
import styles from "./TutorialsLink.module.css";

/**
 * Show a button with link to the Tutorials homepage with an icon
 * @param link string The path to the tutorials
 */
export const TutorialsLink = ({ link }) => (
  <a className={styles.tutorialslink} href={link}>
    <svg
      viewBox="0 0 16 16"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      data-rnw-int-class="nearest__262-1673__"
      className={styles.tutorialsicon}
    >
      <path
        d="M14.5 16h-13a.5.5 0 01-.5-.5V.5a.5.5 0 01.5-.5h13a.5.5 0 01.5.5v15a.5.5 0 01-.5.5zM2 15h12V1H2v14z"
        fill="currentColor"
      ></path>
      <path d="M13 2H3v1h10V2zM13 13H3v1h10v-1z" fill="currentColor"></path>
    </svg>
    <span>Tutorials</span>
  </a>
);

export default TutorialsLink;

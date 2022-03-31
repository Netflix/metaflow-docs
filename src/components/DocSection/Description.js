import React from "react";
import styles from "./Description.module.css";
import Markdown from "./Markdown";

export const Description = ({ summary, extended_summary }) => {
  return (
    <div>
      <Markdown
        md={summary + "\\n\\n" + (extended_summary ?? "")}
        className={styles.wrapper}
      />
    </div>
  );
};

export default Description;

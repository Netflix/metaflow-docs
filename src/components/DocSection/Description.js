import React, { useContext, useState, useEffect } from "react";
import { ExpandedContext } from "./DocSection";
import styles from "./Description.module.css";

export const Description = ({ summary, extended_summary }) => {
  const expanded = useContext(ExpandedContext);
  const [localExpanded, setLocalExpanded] = useState(expanded);

  useEffect(() => setLocalExpanded(expanded), [expanded]);

  const toggle = () => setLocalExpanded((e) => !e);

  return (
    <div className={styles.wrapper}>
      {extended_summary ? (
        <div className={styles.caret_wrapper}>
          <button onClick={toggle}>{localExpanded ? "⌄" : "›"}</button>
        </div>
      ) : null}
      <div className={styles.description}>
        {summary} {localExpanded ? <div>{extended_summary}</div> : ""}
      </div>
    </div>
  );
};

export default Description;

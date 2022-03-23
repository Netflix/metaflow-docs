import React, { useContext, useState, useEffect } from "react";
import { ExpandedContext } from "./DocSection";
import styles from "./Parameter.module.css";

export const Parameter = ({ name, type, desc }) => {
  const expanded = useContext(ExpandedContext);
  const [localExpanded, setLocalExpanded] = useState(expanded);

  useEffect(() => setLocalExpanded(expanded), [expanded]);

  const toggle = () => setLocalExpanded((e) => !e);
  return (
    <div className={styles.wrapper}>
      <div className={styles.caret_wrapper}>
        {desc ? (
          <button onClick={toggle}>{localExpanded ? "⌄" : "›"}</button>
        ) : null}
      </div>
      <div className={styles.parameter}>
        <div>
          <strong>{name}</strong> <span className={styles.type}>{type}</span>
        </div>
        {localExpanded ? <div>{desc}</div> : null}
      </div>
    </div>
  );
};

export default Parameter;

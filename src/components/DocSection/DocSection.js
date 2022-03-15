import React, { useState, createContext } from "react";
import styles from "./DocSection.module.css";

const BASE_URL = "https://github.com/Netflix/metaflow/tree/master/";

export const ExpandedContext = createContext(false);

export const DocSection = ({ children, name, link }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded((e) => !e);

  return (
    <ExpandedContext.Provider value={expanded}>
      <h2>
        {name}&nbsp;
        <a href={BASE_URL + link} target="_blank" className={styles.link}>
          🔗
        </a>
        <button onClick={toggleExpand} className={styles.expand_button}>
          {expanded ? "Collapse" : "Expand"} all
        </button>
      </h2>
      {children.filter((child) => child.props.mdxType === "Description")}
      {children.filter((child) => child.props.mdxType !== "Description")}
    </ExpandedContext.Provider>
  );
};

export default DocSection;

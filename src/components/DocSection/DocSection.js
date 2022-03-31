import React from "react";
import styles from "./DocSection.module.css";

const BASE_URL = "https://github.com/Netflix/metaflow/tree/master/";

export const DocSection = ({
  children,
  name,
  module,
  link,
  heading_level = 3,
  baseUrl = BASE_URL,
}) => {
  return (
    <div>
      <div className={styles.titlebox}>
        <Name heading_level={heading_level}>
          <span className={styles.name}>{name}</span>
          {children.length &&
            children.filter((child) => child.props.mdxType === "SigArgSection")}
        </Name>
        <a className={styles.source} href={baseUrl + link}>
          [source]
        </a>
      </div>
      <p className={styles.module}>
        from {module} import {name}
      </p>
      <div className={styles.content}>
        {children.length &&
          children.filter((child) => child.props.mdxType === "Description")}
        {children.length &&
          children.filter(
            (child) =>
              child.props.mdxType !== "Description" &&
              child.props.mdxType !== "SigArgSection"
          )}
      </div>
    </div>
  );
};

const Name = ({ children, heading_level }) => {
  switch (parseInt(heading_level, 10)) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      return <h3>{children}</h3>;
  }
};

export default DocSection;

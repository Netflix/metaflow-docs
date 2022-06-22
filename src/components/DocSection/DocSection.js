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
  type,
}) => {
  const decoratedName = (type === "decorator" ? "@" : "") + name;
  // Divide name by a "." and highlight the second half
  const lastDotIndex = decoratedName.lastIndexOf(".");
  const highlightedName = decoratedName.substring(lastDotIndex + 1);
  const displayName = decoratedName.substring(0, lastDotIndex + 1);

  return (
    <div className={styles.docSection}>
      <a className={styles.target} id={displayName} />
      <div className={styles.titlebox}>
        <Name heading_level={heading_level} name={name}>
          <span className={styles.name}>{displayName}</span>
          {highlightedName ? (
            <span className={styles.highlightedName}>{highlightedName}</span>
          ) : null}
          {children.length
            ? children.filter(
                (child) => child.props.mdxType === "SigArgSection"
              )
            : null}
        </Name>
        <a className={styles.source} href={baseUrl + link}>
          [source]
        </a>
      </div>
      <p className={styles.module}>
        from {module} import {name}
      </p>
      <div className={styles.content}>
        {React.Children.toArray(children).filter(
          (child) => child.props.mdxType === "Description"
        )}
        {React.Children.toArray(children).filter(
          (child) =>
            child.props.mdxType !== "Description" &&
            child.props.mdxType !== "SigArgSection"
        )}
      </div>
    </div>
  );
};

const Name = ({ children, heading_level, name }) => {
  // Ensure there are no spaces in the id
  const anchorId = name.replace(/\s/, "_");

  const link = (
    <a class="hash-link" href={`#${anchorId}`} title="Direct link to heading">
      ​
    </a>
  );

  switch (parseInt(heading_level, 10)) {
    case 1:
      return (
        <>
          <h1 id={anchorId}>{children}</h1>
          {link}
        </>
      );
    case 2:
      return (
        <>
          <h2 id={anchorId}>{children}</h2>
          {link}
        </>
      );
    case 3:
      return (
        <>
          <h3 id={anchorId}>{children}</h3>
          {link}
        </>
      );
    case 4:
      return (
        <>
          <h4 id={anchorId}>{children}</h4>
          {link}
        </>
      );
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      return <h3>{children}</h3>;
  }
};

export default DocSection;

import React from "react";
import Parameter from "./Parameter";
import styles from "./APIDoc.module.css";
import Return from "./Return";
import Raise from "./Raise";
import Yield from "./Yield";

const sectionMap = {
  parameters: Parameter,
  returns: Return,
  yields: Yield,
  raises: Raise,
};

const getParamType = (section) => sectionMap[section] ?? Parameter;

export const APIDoc = ({ children, lang }) => {
  let section = null;
  let i = 0;
  return (
    <div className={styles.apiDoc}>
      {children.map((child) => {
        i++;

        if (section) {
          if (child.props.mdxType === "p") {
            const Component = getParamType(section);

            section = null;

            const childStr = Array.isArray(child.props?.children)
              ? child.props?.children.join("")
              : child.props?.children;
            return childStr.split("\n").map((line) => {
              i++;
              return <Component key={`parameter_${i}`} line={line} />;
            });
          }
        } else {
          if (child.props?.id?.indexOf("parameters") === 0) {
            section = "parameters";
          }
          if (child.props?.id?.indexOf("returns") === 0) {
            section = "returns";
          }
          if (child.props?.id?.indexOf("yields") === 0) {
            section = "yields";
          }
          if (child.props?.id?.indexOf("raises") === 0) {
            section = "raises";
          }
          return child;
        }
      })}
    </div>
  );
};

export default APIDoc;

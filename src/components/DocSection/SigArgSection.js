import React from "react";

export const SigArgSection = ({ children }) => {
  if (Array.isArray(children)) {
    return (
      <strong>
        (
        {children.map((c, index) => (
          <span key={index}>
            {c}
            {index === children.length - 1 ? "" : ", "}
          </span>
        ))}
        )
      </strong>
    );
  } else {
    return <strong>({children})</strong>;
  }
};

export default SigArgSection;

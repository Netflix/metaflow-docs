import React from "react";

export const SigArgSection = ({ children }) => {
  if (Array.isArray(children)) {
    return (
      <span>
        (
        {children.map((c, index) => (
          <span key={index}>
            {c}
            {index === children.length - 1 ? "" : ", "}
          </span>
        ))}
        )
      </span>
    );
  } else {
    return <span>({children})</span>;
  }
};

export default SigArgSection;

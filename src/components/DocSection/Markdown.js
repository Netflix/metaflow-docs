import React from "react";
import { micromark } from "micromark";

const Markdown = ({ className, md }) => {
  const htmlOutput = md ? micromark(md.replace(/\\n/g, "\n") ?? "") : "";

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: htmlOutput,
      }}
    />
  );
};

export default Markdown;

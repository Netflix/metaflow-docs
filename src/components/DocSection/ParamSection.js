import React from "react";

export const ParamSection = ({ name, children }) => (
  <>
    <h3>{name}</h3>
    {children}
  </>
);

export default ParamSection;

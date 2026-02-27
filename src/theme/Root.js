import React from "react";
import ScrollToTopButton from "@site/src/components/ScrollToTopButton";

export default function Root({ children }) {
  return (
    <>
      {children}
      <ScrollToTopButton />
    </>
  );
}

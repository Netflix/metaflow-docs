import React from "react";
import styles from "./Parameter.module.css";
import Markdown from "./Markdown";

export const Parameter = ({ name, type, desc }) => {
  return (
    <div>
      <div>
        <strong>
          <Markdown
            md={
              (name ? name : "") +
                (name && type ? ": " : "") +
                (type ? type : "") ?? ""
            }
          />
        </strong>
      </div>
      <div>
        <Markdown className={styles.content} md={desc} />
      </div>
    </div>
  );
};

export default Parameter;

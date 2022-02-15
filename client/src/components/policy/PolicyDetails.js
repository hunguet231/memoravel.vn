/* eslint-disable react/prop-types */
import React from "react";
import styles from "styles/Policies.module.scss";
import policy_1 from "./1.html";
import policy_2 from "./2.html";
import policy_3 from "./3.html";
import policy_4 from "./4.html";
import policy_5 from "./5.html";
import policy_6 from "./6.html";

const PolicyDetails = ({ id }) => {
  const policies = [policy_1, policy_2, policy_3, policy_4, policy_5, policy_6];

  return (
    <div className="wrapper">
      <div className="container">
        <div className={styles.container}>
          <div dangerouslySetInnerHTML={{ __html: policies[id - 1] }}></div>
        </div>
      </div>
    </div>
  );
};

export default PolicyDetails;

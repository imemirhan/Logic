import React from "react";
import styles from "./styles/Experience.module.css";

function Experience({ title, company, years}) {
  return (
    <div className={styles.experienceCard}>
      <div className={styles.expHeader}>
        <span className={styles.expTitle}>{title}</span>
      </div>
      <div className={styles.expCompany}>{company}</div>
      <div className={styles.expYears}>Total Years: {years}</div>
    </div>
  );
}

export default Experience;